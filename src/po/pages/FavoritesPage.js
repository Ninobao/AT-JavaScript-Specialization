import BasePage from "./BasePage";

class FavoritesPage extends BasePage {
  constructor(page) {
    super(page);
    this.noFavoritesMessage = page.getByText("There are no favorites yet.");
    this.deleteBtn = page.locator('[data-test="delete"]');
  }

  async productIsVisible(product) {
    const productHandler = this.page.getByText(product);
    return await this.isVisible(productHandler);
  }
}

module.exports = FavoritesPage;
