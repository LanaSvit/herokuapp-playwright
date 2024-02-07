import { test as base, expect } from "@playwright/test";
import { LogInPage } from "../pages/logInPage";
import { loginData } from "../e2eTests/loginData";

export const test = base.extend<{ logInPage: LogInPage }>({
  logInPage: async ({ page }, use) => {
    await use(new LogInPage(page));
  },
});

test("log in negative", async ({ logInPage, page }) => {
  await logInPage.goto();
  await logInPage.logIn(
    loginData.incorrectData.email,
    loginData.incorrectData.password
  );
  await expect(page.locator("//*[@id='error']")).toHaveText(
    "Incorrect username or password"
  );
});

test("log in positive", async ({ logInPage, page }) => {
  await logInPage.goto();
  await logInPage.logIn(
    loginData.correctData.email,
    loginData.correctData.password
  );
  await expect(
    page.getByRole("heading", { name: "Contact List App" })
  ).toBeVisible();
});
