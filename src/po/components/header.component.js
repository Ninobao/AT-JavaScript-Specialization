import BaseComponent from "./base.component.js";

class Header extends BaseComponent {
  constructor(page) {
    super(page);
    this.logoLink = page.getByRole("link", { name: "Practice Software Testing -" });
    this.signInLink = page.locator('[data-test="nav-sign-in"]');
  }

  async logoLinkClick() {
    await this.clickOn(this.logoLink);
  }

  async signInLinkClick() {
    await this.signInLink.click();
    await this.page.waitForLoadState();
  }
}

export default Header;
