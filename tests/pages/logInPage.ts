import type { Page, Locator } from "@playwright/test";

export class LogInPage {
  private readonly inputEmail: Locator;
  private readonly inputPassword: Locator;
  private readonly btnSubmit: Locator;

  constructor(public readonly page: Page) {
    this.inputEmail = this.page.locator("//input[@id='email']");
    this.inputPassword = this.page.locator("//input[@id='password']");
    this.btnSubmit = this.page.locator("//button[@id='submit']");
  }

  async goto() {
    await this.page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  }

  async logIn(email: string, password: string) {
    await this.inputEmail.fill(email);
    await this.inputPassword.fill(password);
    await this.btnSubmit.click();
  }
}
