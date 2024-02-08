import { expect } from "@playwright/test";
import { loginData } from "../e2eTests/loginData";
import { test } from "../fixtures/fixtures.ts";

test("log in negative", async ({ logInPage }) => {
  await logInPage.goto();
  await logInPage.logIn(
    loginData.incorrectData.email,
    loginData.incorrectData.password
  );
  await expect(logInPage.errorMessage).toHaveText(
    "Incorrect username or password"
  );
});

test("log in positive", async ({ logInPage, contactListPage }) => {
  await logInPage.goto();
  await logInPage.logIn(
    loginData.correctData.email,
    loginData.correctData.password
  );
  await expect(contactListPage.contactListHeader).toBeVisible();
});
