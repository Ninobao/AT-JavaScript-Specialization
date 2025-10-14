import BasePage from './base.page.js';

class AccountPage extends BasePage {
  constructor(page) {
    super(page);
    this.profileLink = page.locator('[data-test="nav-profile"]');
  }
}

export default AccountPage;
