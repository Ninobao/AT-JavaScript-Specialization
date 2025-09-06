class BasePage {
  constructor(page) {
    this.page = page;
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

  async alertIsVisible(alertText) {
    const alert = this.page.getByRole("alert", { name: `${alertText}` });
    await alert.waitFor({ state: "visible" });
    return await alert.isVisible();
  }
}

module.exports = BasePage;
