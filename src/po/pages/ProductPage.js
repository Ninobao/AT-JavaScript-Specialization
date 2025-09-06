import BasePage from "./BasePage";
import HeaderComponent from "../components/HeaderComponent";

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.addToFavorites = page.locator('[data-test="add-to-favorites"]');
    this.outOfStock = page.locator('[data-test="out-of-stock"]');
    this.increase = page.locator('[data-test="increase-quantity"]');
    this.decrease = page.locator('[data-test="decrease-quantity"]');
    this.addToCart = page.locator('[data-test="add-to-cart"]');
    this.cartLink = page.locator('[data-test="nav-cart"]');

    this.header = new HeaderComponent(page);
  }

  async addToFavoritesClick() {
    await this.addToFavorites.click();
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
}

module.exports = ProductPage;
