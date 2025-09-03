import BasePage from "./BasePage";

class LoginPage extends BasePage {
  constructor(page) {
    super(page, "/auth/login");
    this.registerLink = page.locator('[data-test="register-link"]');
  }
}

module.exports = LoginPage;
