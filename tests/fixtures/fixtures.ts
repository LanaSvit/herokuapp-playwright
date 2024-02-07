import { test as base } from "@playwright/test";
import { PageType } from "../typings";
import { LogInPage } from "../pages/logInPage";
import { ContactListPage } from "../pages/contactListPage";

export const test = base.extend<PageType>({
  logInPage: async ({ page }, use) => {
    await use(new LogInPage(page));
  },
  contactListPage: async ({ page }, use) => {
    await use(new ContactListPage(page));
  },
});
