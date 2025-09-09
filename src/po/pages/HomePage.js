import BasePage from "./BasePage";
import HeaderComponent from "../components/header.component";

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.toolBeltsCheckbox = page.getByRole("checkbox", { name: "Tool Belts" });
    this.workbenchCheckbox = page.getByRole("checkbox", { name: "Workbench" });
    this.noProductsFoundMsg = page.locator('[data-test="no-results"]', {
      hasText: "There are no products found.",
    });

    this.header = new HeaderComponent(page);
  }

  async productIsVisible(product) {
    const productHandler = this.page.getByText(product);
    return await this.isVisible(productHandler);
  }

  async clickOnProduct(product) {
    const productHandler = this.page.getByText(product);
    await this.clickOn(productHandler);
  }

  async addProductsFilter(checkbox) {
    await checkbox.check();
    await this.page.waitForLoadState();
  }
}

module.exports = HomePage;
