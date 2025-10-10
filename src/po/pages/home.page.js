import BasePage from './base.page.js';

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.toolBeltsCheckbox = page.getByRole('checkbox', { name: 'Tool Belts' });
    this.workbenchCheckbox = page.getByRole('checkbox', { name: 'Workbench' });
    this.noProductsFoundMsg = page.locator('[data-test="no-results"]', {
      hasText: 'There are no products found.',
    });
  }

  async productIsVisible(product) {
    const productHandler = this.page.getByText(product);
    return await this.isVisible(productHandler);
  }

  async clickOnProduct(product) {
    const productHandler = this.page.getByText(product);
    await productHandler.click();
  }

  async addProductsFilter(checkbox) {
    await checkbox.check();
    await this.page.waitForLoadState();
  }
}

export default HomePage;
