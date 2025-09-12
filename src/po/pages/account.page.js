import BasePage from "./base.page";

class AccountPage extends BasePage {
  constructor(page) {
    super(page);
    this.profileLink = page.locator('[data-test="nav-profile"]');
  }
}

module.exports = AccountPage;
