import type { Locator, Page } from "@playwright/test";

export class ContactListPage {
  readonly page: Page;
  readonly contactListHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactListHeader = page.getByRole("heading", {
      name: "Contact List App",
    });
  }

  async clickAdd() {
    await this.page.locator("//button[@id='add-contact']").click();
  }

  async fillContactForm(name: string, lastName: string, email: string) {
    await this.page.locator("//input[@id='firstName']").fill(name);
    await this.page.locator("//input[@id='lastName']").fill(lastName);
    await this.page.locator("//input[@id='email']").fill(email);
    await this.page.locator("//button[@id='submit']").click();
  }

  async openContact(email: string) {
    await this.page
      .locator(
        "//*[@class='contactTableBodyRow']//child::td[contains(text(), '" +
          email +
          "')]"
      )
      .click();
  }

  async clickEdit() {
    await this.page.locator("//button[@id='edit-contact']").click();
  }

  async clickDelete() {
    await this.page.locator("//button[@id='delete']").click();
  }
}
