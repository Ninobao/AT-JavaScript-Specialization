import BasePage from './base.page.js';

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartEmptyMsg = page.getByText('The cart is empty. Nothing to');
  }

  async linePriceIsVisible(price) {
    const linePrice = this.page.locator('[data-test="line-price"]', { hasText: `${price}` });
    return this.isVisible(linePrice);
  }

  async cartTotalIsVisible(price) {
    const cartTotal = this.page.locator('[data-test="cart-total"]', { hasText: `${price}` });
    return this.isVisible(cartTotal);
  }

  async deleteProductIsVisible(product) {
    const deleteProduct = this.page.getByRole('row', { name: `${product}  Quantity` }).locator('a');
    return this.isVisible(deleteProduct);
  }

  async deleteProductClick(product) {
    const productDelete = this.page.getByRole('row', { name: `${product}  Quantity` }).locator('a');
    await productDelete.click();
  }
}

export default CheckoutPage;
