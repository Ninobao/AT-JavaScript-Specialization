import BasePage from "./BasePage";

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.signInLink = page.locator('[data-test="nav-sign-in"]');
    this.toolBeltsCheckbox = page.getByRole("checkbox", { name: "Tool Belts" });
    this.workbenchCheckbox = page.getByRole("checkbox", { name: "Workbench" });
    this.noProductsFoundMsg = page.locator('[data-test="no-results"]', {
      hasText: "There are no products found.",
    });
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

  async checkboxIsVisible(checkBox) {
    await checkBox.waitFor({ state: "visible" });
    return await checkBox.isVisible();
  }

  async addProductsFilter(checkbox) {
    await checkbox.check();
    await this.page.waitForLoadState();
  }

  async noProductsFoundVisible() {
    await this.noProductsFoundMsg.waitFor({ state: "visible" });
    return await this.noProductsFoundMsg.isVisible();
  }
}

module.exports = HomePage;
