import BasePage from './base.page';

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
}

module.exports = ProductPage;
