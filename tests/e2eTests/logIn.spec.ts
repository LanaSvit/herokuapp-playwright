import { test as base, expect } from "@playwright/test";
import { LogInPage } from "../pages/logInPage";

const correctEmail = "jdkajkdj@ljklj.com";
const correctPassword = "qm.JR8JmW8T!Aj";
const incorrectPassword = "dwefefsrfs";
const incorrectEmail = "dsdsfsfdsfd@d.com";

export const test = base.extend<{ logInPage: LogInPage }>({
  logInPage: async ({ page }, use) => {
    await use(new LogInPage(page));
  },
});

test("log in negative", async ({ logInPage, page }) => {
  await logInPage.goto();
  await logInPage.logIn(incorrectEmail, incorrectPassword);
  await expect(page.locator("//*[@id='error']")).toHaveText(
    "Incorrect username or password"
  );
});

test("log in positive", async ({ logInPage, page }) => {
  await logInPage.goto();
  await logInPage.logIn(correctEmail, correctPassword);
  await expect(
    page.getByRole("heading", { name: "Contact List App" })
  ).toBeVisible();
});
