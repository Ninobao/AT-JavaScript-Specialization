class Header {
  constructor(page) {
    this.page = page;
    this.logoLink = page.getByRole("link", { name: "Practice Software Testing -" });
    this.signInLink = page.locator('[data-test="nav-sign-in"]');
  }

  async logoLinkClick() {
    await this.logoLink.click();
    await this.page.waitForLoadState();
  }

  async signInLinkClick() {
    await this.signInLink.click();
    await this.page.waitForLoadState();
  }
}

export default Header;
