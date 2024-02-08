import { Page } from "playwright/test";

export class BasePage {
  readonly page: Page;
  readonly URL: string;

  constructor(page: Page) {
    this.page = page;
    this.URL = "https://thinking-tester-contact-list.herokuapp.com/";
  }
}
