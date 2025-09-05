import BasePage from "./BasePage";

class FavoritesPage extends BasePage {
  constructor(page) {
    super(page);
    this.noFavoritesMessage = page.getByText("There are no favorites yet.");
    this.delete = page.locator('[data-test="delete"]');
  }

  // async waitForNoFavoritesMsgVisible() {
  //   await this.noFavoritesMessage.waitFor({ state: "visible" });
  // }

  // async noFavoritesMsgIsVisible() {
  //   return await this.noFavoritesMessage.isVisible();
  // }

  async productIsVisible(product) {
    const productHandler = this.page.getByText(product);
    await productHandler.waitFor({ state: "visible" });
    return await productHandler.isVisible();
  }

  async deleteSingleFavorite() {
    await this.delete.click();
  }

  async noFavoritesIsVisible() {
    await this.noFavoritesMessage.waitFor({ state: "visible" });
    return await this.noFavoritesMessage.isVisible();
  }
}

module.exports = FavoritesPage;
