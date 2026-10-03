import { Page, Locator } from '@playwright/test';

export class LoginPage {

  username: Locator;
  private password: Locator;
  private btnLogin: Locator;
   
  constructor(private page: Page) {

    this.username = page.locator("#email");
    this.password = page.locator("#password");
    this.btnLogin = page.locator("#login-btn");
  }

  async navigateToLogin() {
    const baseUrl = process.env.UI_BASE_URL;
    
    if (!baseUrl) {
      throw new Error('UI_BASE_URL environment variable is not set');
    }

    await this.page.goto(baseUrl);
  }

  async enterUsername(username: string) {
    await this.username.clear();
    await this.username.fill(username);
  }

  async enterPassword(password: string) {
    await this.password.clear();
    await this.password.fill(password);
  }

  async clickLoginButton() {
    await this.btnLogin.click();
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}
