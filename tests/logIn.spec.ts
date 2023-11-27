import { test, expect, chromium } from "@playwright/test";

test("log in negative", async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const browserInstance = await browser.newContext();

  const page = await browserInstance.newPage();

  await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  await page.locator("//input[@id='email']").fill("dsdsfsfdsfd@d.com");
  await page.locator("//input[@id='password']").fill("dwefefsrfs");
  await page.locator("//button[@id='submit']").click();
  await expect(page.locator("//*[@id='error']")).toHaveText(
    "Incorrect username or password"
  );
});

test("log in positive", async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const browserInstance = await browser.newContext();

  const page = await browserInstance.newPage();

  await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  await page.locator("//input[@id='email']").fill("jdkajkdj@ljklj.com");
  await page.locator("//input[@id='password']").fill("qm.JR8JmW8T!Aj");
  await page.locator("//button[@id='submit']").click();
  await expect(
    page.getByRole("heading", { name: "Contact List App" })
  ).toBeVisible();
});
