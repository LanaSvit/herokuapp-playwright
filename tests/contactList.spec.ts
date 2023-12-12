import { test as base, expect } from "@playwright/test";
import { LogInPage } from "./pages/logInPage";
import { ContactListPage } from "./pages/contactListPage";
import { generateUniqueEmail } from "./utils/utils";

type MyFixtures = {
  logInPage: LogInPage;
  contactListPage: ContactListPage;
};

const correctEmail = "jdkajkdj@ljklj.com";
const correctPassword = "qm.JR8JmW8T!Aj";
const contactName = "contactName";
const contactLastName = "contactLastName";
const newContactName = "NewName";
const newContactLastName = "NewLastName";
const contactEmail = generateUniqueEmail();
const newContactEmail = "newjfkjk@jk.vkj";

export const test = base.extend<MyFixtures>({
  logInPage: async ({ page }, use) => {
    await use(new LogInPage(page));
  },
  contactListPage: async ({ page }, use) => {
    await use(new ContactListPage(page));
  },
});

test("Add new contact", async ({ logInPage, contactListPage, page }) => {
  await logInPage.goto();
  await logInPage.logIn(correctEmail, correctPassword);
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
  await logInPage.goto();
  await logInPage.logIn(correctEmail, correctPassword);
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
  await expect(page.locator("//*[@id='email']")).toHaveText(newContactEmail);
});

test("Delete contact", async ({ logInPage, contactListPage, page }) => {
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await logInPage.goto();
  await logInPage.logIn(correctEmail, correctPassword);
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
