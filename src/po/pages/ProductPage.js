import BasePage from "./BasePage";

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.addToFavorites = page.locator('[data-test="add-to-favorites"]');
    this.outOfStock = page.locator('[data-test="out-of-stock"]');
    this.increase = page.locator('[data-test="increase-quantity"]');
    this.decrease = page.locator('[data-test="decrease-quantity"]');
    this.addToCart = page.locator('[data-test="add-to-cart"]');
    this.cartLink = page.locator('[data-test="nav-cart"]');
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

  async addToCartIsVisible() {
    await this.addToCart.waitFor({ state: "visible", timeout: 3500 });
    return await this.addToCart.isVisible();
  }

  async addToCartClick() {
    await this.addToCart.click();
  }

  async increaseIsVisible() {
    await this.increase.waitFor({ state: "visible", timeout: 3500 });
    return await this.increase.isVisible();
  }

  async increaseClick() {
    await this.increase.click();
  }

  async cartLinkIsVisible() {
    await this.cartLink.waitFor({ state: "visible", timeout: 3500 });
    return await this.cartLink.isVisible();
  }

  async cartLinkClick() {
    await this.cartLink.click();
    await this.page.waitForURL("/checkout");
    await this.page.waitForLoadState();
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
