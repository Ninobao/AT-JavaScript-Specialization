// import { expect } from "@playwright/test";

class BasePage {
  constructor(page, url) {
    this.page = page;
    this.url = url;
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  // async waitForPageReady(selector) {
  //   await this.page.waitForSelector(selector, { state: "visible" });
  // }

  // async expectTitleContains(text) {
  //   await expect(this.page).toHaveTitle(new RegExp(text));
  // }

  // getLocator(selector) {
  //   return this.page.locator(selector);
  // }
}

module.exports = BasePage;
