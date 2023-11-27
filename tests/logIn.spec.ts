import { test, expect, chromium } from "@playwright/test";
import { logIn } from "./helpers/logInPage";

const correctEmail = "jdkajkdj@ljklj.com";
const correctPassword = "qm.JR8JmW8T!Aj";
const incorrectPassword = "dwefefsrfs";
const incorrectEmail = "dsdsfsfdsfd@d.com";

test("log in negative", async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const browserInstance = await browser.newContext();

  const page = await browserInstance.newPage();
  await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  await logIn(page, incorrectEmail, incorrectPassword);
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
  await logIn(page, correctEmail, correctPassword);
  await expect(
    page.getByRole("heading", { name: "Contact List App" })
  ).toBeVisible();
});
