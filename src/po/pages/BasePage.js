class BasePage {
  constructor(page) {
    this.page = page;
    this.logoLink = page.getByRole("link", { name: "Practice Software Testing -" });
  }

  async navigateTo(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState();
  }

  async waitForURL(url) {
    await this.page.waitForURL(url);
  }

  getURL() {
    return this.page.url();
  }

  async getAttribute(element, attribute) {
    return await element.getAttribute(attribute);
  }

  async logoLinkClick() {
    await this.logoLink.click();
    await this.page.waitForLoadState();
  }

  // async waitForVisible(element) {
  //   await element.waitFor({ state: "visible" });
  // }

  // async isVisible(element) {
  //   await element.isVisible();
  // }
}

module.exports = BasePage;
