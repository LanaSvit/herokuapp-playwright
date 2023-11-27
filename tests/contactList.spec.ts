import { test, expect, chromium } from "@playwright/test";
import { logIn } from "./helpers/logInPage";

const correctEmail = "jdkajkdj@ljklj.com";
const correctPassword = "qm.JR8JmW8T!Aj";
const newContactName = "Newname";

test("Add new contact", async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const browserInstance = await browser.newContext();

  const page = await browserInstance.newPage();

  await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  await logIn(page, correctEmail, correctPassword);
  await page.locator("//button[@id='add-contact']").click();
  await page.locator("//input[@id='firstName']").fill(newContactName);
  await page.locator("//input[@id='lastName']").fill("Newlastname");
  await page.locator("//input[@id='email']").fill("newjkjkljkj@kdl.ckl");
  await page.locator("//button[@id='submit']").click();

  await expect(
    page.locator(
      "//*[@class='contactTableBodyRow']//child::td[contains(text(), '" +
        newContactName +
        "')]"
    )
  ).toBeVisible();
});
