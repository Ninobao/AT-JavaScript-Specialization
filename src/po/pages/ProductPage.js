import BasePage from "./BasePage";

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.addToFavorites = page.locator('[data-test="add-to-favorites"]');
    this.outOfStock = page.locator('[data-test="out-of-stock"]');
    this.increase = page.locator('[data-test="increase-quantity"]');
    this.decrease = page.locator('[data-test="decrease-quantity"]');
  }

  async addToFavoritesClick() {
    await this.addToFavorites.click();
  }

  async alertIsVisible(alertText) {
    const alert = this.page.getByRole("alert", { name: `${alertText}` });
    await alert.waitFor({ state: "visible" });
    return await alert.isVisible();
  }

  async outOfStockIsVisible() {
    await this.outOfStock.waitFor({ state: "visible" });
    return await this.outOfStock.isVisible();
  }

  //   async waitForNoFavoritesMsgVisible() {
  //     // await this.waitForVisible(this.noFavoritesMessage);
  //     await this.noFavoritesMessage.waitFor({ state: "visible" });
  //   }

  //   async noFavoritesMsgIsVisible() {
  //     return await this.noFavoritesMessage.isVisible();
  //   }
}

module.exports = ProductPage;
