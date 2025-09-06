import BasePage from "./BasePage";

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.registerLink = page.locator('[data-test="register-link"]');
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.loginSubmit = page.locator('[data-test="login-submit"]');
  }

  async enterCredentials(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginSubmit.click();
    await this.page.waitForURL("https://practicesoftwaretesting.com/account");
  }

  async registerLinkClick() {
    await this.registerLink.click();
    await this.page.waitForLoadState();
  }
}

module.exports = LoginPage;
