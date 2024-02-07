import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LogInPage extends BasePage {
  readonly inputEmail: Locator;
  readonly inputPassword: Locator;
  readonly btnSubmit: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.inputEmail = page.locator("//input[@id='email']");
    this.inputPassword = page.locator("//input[@id='password']");
    this.btnSubmit = page.locator("//button[@id='submit']");
    this.errorMessage = page.locator("//*[@id='error']");
  }

  async goto() {
    await this.page.goto(this.URL);
  }

  async logIn(email: string, password: string) {
    await this.inputEmail.fill(email);
    await this.inputPassword.fill(password);
    await this.btnSubmit.click();
  }
}
