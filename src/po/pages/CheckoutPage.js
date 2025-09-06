import BasePage from "./BasePage";

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartEmptyMsg = page.getByText("The cart is empty. Nothing to");
  }

  async linePriceIsVisible(price) {
    const linePrice = this.page.locator('[data-test="line-price"]', { hasText: `${price}` });
    await linePrice.waitFor({ state: "visible", timeout: 3500 });
    return await linePrice.isVisible();
  }

  async cartTotalIsVisible(price) {
    const linePrice = this.page.locator('[data-test="cart-total"]', { hasText: `${price}` });
    await linePrice.waitFor({ state: "visible", timeout: 3500 });
    return await linePrice.isVisible();
  }

  async deleteProductIsVisible(product) {
    const deleteProduct = this.page.getByRole("row", { name: `${product}  Quantity` }).locator("a");
    await deleteProduct.waitFor({ state: "visible", timeout: 3500 });
    return await deleteProduct.isVisible();
  }

  async deleteProductClick(product) {
    const productDelete = this.page.getByRole("row", { name: `${product}  Quantity` }).locator("a");
    await productDelete.click();
  }

  async alertIsVisible(alertText) {
    const alert = this.page.getByRole("alert", { name: `${alertText}` });
    await alert.waitFor({ state: "visible" });
    return await alert.isVisible();
  }

  async cartEmptyVisible() {
    await this.cartEmptyMsg.waitFor({ state: "visible", timeout: 5000 });
    return await this.cartEmptyMsg.isVisible();
  }
}

module.exports = CheckoutPage;
