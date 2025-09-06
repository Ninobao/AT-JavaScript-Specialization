import BasePage from "./BasePage";

class AccountPage extends BasePage {
  constructor(page) {
    super(page);
    this.profileLink = page.locator('[data-test="nav-profile"]');
  }

  async profileLinkClick() {
    await this.profileLink.click();
    await this.page.waitForURL("https://practicesoftwaretesting.com/account/profile");
  }
}

module.exports = AccountPage;
