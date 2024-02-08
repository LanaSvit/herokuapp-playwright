import { expect } from "@playwright/test";
import { generateUniqueEmail } from "../utils/utils";
import { loginData } from "./loginData";
import { test } from "../fixtures/fixtures.ts";

const contactName = "contactName";
const contactLastName = "contactLastName";
const newContactName = "NewName";
const newContactLastName = "NewLastName";
const newContactEmail = "newjfkjk@jk.vkj";

test("Add new contact", async ({ logInPage, contactListPage, page }) => {
  const contactEmail = generateUniqueEmail();

  await logInPage.goto();
  await logInPage.logIn(
    loginData.correctData.email,
    loginData.correctData.password
  );
  await contactListPage.clickAdd();
  await contactListPage.fillContactForm(
    contactName,
    contactLastName,
    contactEmail
  );

  await expect(
    page.locator(
      "//*[@class='contactTableBodyRow']//child::td[contains(text(), '" +
        contactEmail +
        "')]"
    )
  ).toBeVisible();
});

test("Edit contact", async ({ logInPage, contactListPage, page }) => {
  const contactEmail = generateUniqueEmail();

  await logInPage.goto();
  await logInPage.logIn(
    loginData.correctData.email,
    loginData.correctData.password
  );
  await contactListPage.clickAdd();
  await contactListPage.fillContactForm(
    contactName,
    contactLastName,
    contactEmail
  );
  await contactListPage.openContact(contactEmail);
  await contactListPage.clickEdit();
  await contactListPage.fillContactForm(
    newContactName,
    newContactLastName,
    newContactEmail
  );
  await page.waitForSelector("h1", { state: "visible" });
  await expect(page.locator("//*[@id='email']")).toHaveText(newContactEmail);
});

test("Delete contact", async ({ logInPage, contactListPage, page }) => {
  const contactEmail = generateUniqueEmail();

  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await logInPage.goto();
  await logInPage.logIn(
    loginData.correctData.email,
    loginData.correctData.password
  );
  await contactListPage.clickAdd();
  await contactListPage.fillContactForm(
    contactName,
    contactLastName,
    contactEmail
  );
  await contactListPage.openContact(contactEmail);
  await contactListPage.clickDelete();
  await expect(
    page.locator(
      "//*[@class='contactTableBodyRow']//child::td[contains(text(), '" +
        contactEmail +
        "')]"
    )
  ).toBeHidden();
});
