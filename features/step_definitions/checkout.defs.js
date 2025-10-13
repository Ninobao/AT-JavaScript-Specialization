import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect as chaiExpect } from 'chai';

import HomePage from '../../src/po/pages/home.page.js';
import ProductPage from '../../src/po/pages/product.page.js';
import CheckoutPage from '../../src/po/pages/checkout.page.js';

setDefaultTimeout(60 * 1000);

Given('the User adds one Combination Pliers to the cart', async function () {
  const homePage = new HomePage(this.page);
  const productPage = new ProductPage(this.page);

  const pliersIsVisible = await homePage.productIsVisible('Combination Pliers');
  chaiExpect(pliersIsVisible).to.be.true;

  await homePage.clickOnProduct('Combination Pliers');

  const addToCartVisible = await productPage.isVisible(productPage.addToCart);
  chaiExpect(addToCartVisible).to.be.true;

  await productPage.addToCart.click();
  const productAddedVisible = await productPage.alertIsVisible('Product added to shopping');
  chaiExpect(productAddedVisible).to.be.true;
});

Given('the User adds two Bolt Cutters to the cart', async function () {
  const homePage = new HomePage(this.page);
  const productPage = new ProductPage(this.page);

  const boltCuttersVisible = await homePage.productIsVisible('Bolt Cutters');
  chaiExpect(boltCuttersVisible).to.be.true;

  await homePage.clickOnProduct('Bolt Cutters');

  const increaseVisible = await productPage.isVisible(productPage.increase);
  chaiExpect(increaseVisible).to.be.true;

  await productPage.increase.click();

  const addCartVisible = await productPage.isVisible(productPage.addToCart);
  chaiExpect(addCartVisible).to.be.true;

  await productPage.addToCart.click();
  const productAddVisible = await productPage.alertIsVisible('Product added to shopping');
  chaiExpect(productAddVisible).to.be.true;
});

When('the User goes to the Checkout page', async function () {
  const productPage = new ProductPage(this.page);
  const checkoutPage = new CheckoutPage(this.page);

  const navCartVisible = await productPage.isVisible(productPage.cartLink);
  chaiExpect(navCartVisible).to.be.true;

  await productPage.cartLink.click();
  await checkoutPage.waitForURL(this.baseURL + '/checkout');
});

When('the sub-total price of the Combination Pliers is $14.15', async function () {
  const checkoutPage = new CheckoutPage(this.page);

  const linePrice1Visible = await checkoutPage.linePriceIsVisible('$14.15');
  chaiExpect(linePrice1Visible).to.be.true;
});

When('the sub-total price of the Bolt Cutters is $96.82', async function () {
  const checkoutPage = new CheckoutPage(this.page);

  const linePrice2Visible = await checkoutPage.linePriceIsVisible('$96.82');
  chaiExpect(linePrice2Visible).to.be.true;
});

Then('the total price of the cart is $110.97', async function () {
  const checkoutPage = new CheckoutPage(this.page);

  const cartTotalVisible = await checkoutPage.cartTotalIsVisible('$110.97');
  chaiExpect(cartTotalVisible).to.be.true;
});
