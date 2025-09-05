import BasePage from "./BasePage";

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.signInLink = page.locator('[data-test="nav-sign-in"]');
  }

  async signInLinkClick() {
    await this.signInLink.click();
    await this.page.waitForLoadState();
  }

  async productIsVisible(product) {
    const productHandler = this.page.getByText(product);
    await productHandler.waitFor({ state: "visible" });
    return await productHandler.isVisible();
  }

  async clickOnProduct(product) {
    await this.page.getByText(product).click();
    await this.page.waitForLoadState();
  }
}

module.exports = HomePage;
