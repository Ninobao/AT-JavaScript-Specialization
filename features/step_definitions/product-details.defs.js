import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { assert } from 'chai';
// import { chromium } from '@playwright/test';

import HomePage from '../../src/po/pages/home.page.js';
import ProductPage from '../../src/po/pages/product.page.js';
import FavoritesPage from '../../src/po/pages/favorites.page.js';

setDefaultTimeout(60 * 1000);

Given('the User navigates to the favorites page', async function () {
  const favoritesPage = new FavoritesPage(this.page);

  await favoritesPage.navigateTo(this.baseURL + '/account/favorites');
});

Given('the Combination Pliers product is not already in Favorites', async function () {
  const favoritesPage = new FavoritesPage(this.page);

  const noFavsIsVisible = await favoritesPage.isVisible(favoritesPage.noFavoritesMessage);
  assert.isTrue(noFavsIsVisible, "Expected 'There are no favorites yet.' message to be visible");
});

Given('the User navigates to the home page', async function () {
  const homePage = new HomePage(this.page);

  await homePage.navigateTo(this.baseURL);
});

Given('the User clicks on Combination Pliers', async function () {
  const homePage = new HomePage(this.page);

  const combinationPliersIsVisible = await homePage.productIsVisible('Combination Pliers');
  assert.isTrue(combinationPliersIsVisible, "Expected 'Combination pliers.' to be visible");
  await homePage.clickOnProduct('Combination Pliers');
});

When('the User adds the Combination Pliers to Favorites', async function () {
  const productPage = new ProductPage(this.page);

  await productPage.addToFavorites.click();
});

Then('the message Product added to your favorites list. is displayed', async function () {
  const productPage = new ProductPage(this.page);

  const addedToFavoritesVisible = await productPage.alertIsVisible('Product added to your');
  assert.isTrue(addedToFavoritesVisible, "Expected alert 'Product added to your' to be visible");
});

Then('the Combination Pliers are shown in the Favorites page', async function () {
  const favoritesPage = new FavoritesPage(this.page);

  await favoritesPage.navigateTo(this.baseURL + '/account/favorites');
  await favoritesPage.waitForURL(this.baseURL + '/account/favorites');
  const favoritesURL = favoritesPage.getURL();
  assert.equal(favoritesURL, 'https://practicesoftwaretesting.com/account/favorites');
  const combinationPliersIsFavorite = await favoritesPage.productIsVisible('Combination Pliers');
  assert.isTrue(combinationPliersIsFavorite, 'Expected Combination Pliers to be visible.');

  // (Remove the product for future re-test)
  await favoritesPage.deleteBtn.click();
  const noFavsisVisible = await favoritesPage.isVisible(favoritesPage.noFavoritesMessage);
  assert.isTrue(noFavsisVisible, "Expected 'There are no favorites yet.' message to be visible");
});

Given('the User clicks on Long Nose Pliers', async function () {
  const homePage = new HomePage(this.page);

  const longNosePliersIsVisible = await homePage.productIsVisible('Long Nose Pliers');
  assert.isTrue(longNosePliersIsVisible, "Expected 'Combination pliers.' to be visible");
  await homePage.clickOnProduct('Long Nose Pliers');
});

When('the Long Nose Pliers page has the Out of stock message', async function () {
  const productPage = new ProductPage(this.page);

  const outOfStockIsVisible = await productPage.isVisible(productPage.outOfStock);
  assert.isTrue(outOfStockIsVisible, 'Expected Out Of Stock message to be visible.');
});

Then('the Quantity selector and the Add to cart button are disabled', async function () {
  const productPage = new ProductPage(this.page);

  const decreasedAttr = await productPage.getAttribute(productPage.decrease, 'disabled');
  assert.strictEqual(decreasedAttr, '', "Expected 'disabled' attribute on decrease");

  const increaseAttr = await productPage.getAttribute(productPage.increase, 'disabled');
  assert.strictEqual(increaseAttr, '', "Expected 'disabled' attribute on increase");
});
