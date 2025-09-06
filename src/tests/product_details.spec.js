import { test, expect } from "@playwright/test";
import { assert } from "chai";

import RegisterPage from "../po/pages/RegisterPage";
import LoginPage from "../po/pages/LoginPage";
import FavoritesPage from "../po/pages/FavoritesPage";
import HomePage from "../po/pages/HomePage";
import ProductPage from "../po/pages/ProductPage";
import { testUser } from "./data/userData";

test.describe("product details page", () => {
  test.beforeEach(async ({ page, context, baseURL }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await context.clearCookies();

    await registerPage.navigateTo(baseURL + "/auth/register");

    await registerPage.fillProfileFields({
      ...testUser,
    });

    try {
      await registerPage.registerBtnClick();
      await expect(page).toHaveURL(baseURL + "/auth/login");
      console.log("Account created");
    } catch (err) {
      console.log("The account was already created");
    }

    // Given the user is logged
    await loginPage.navigateTo(baseURL + "/auth/login");
    await loginPage.enterCredentials("email@example.com", "123_Tests");
    const accountURL = page.url();
    assert.equal(accountURL, "https://practicesoftwaretesting.com/account");
  });

  test("user adds a product to Favorites", async ({ page, baseURL }) => {
    const favoritesPage = new FavoritesPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // And the Combination Pliers product is not already in Favorites
    await favoritesPage.navigateTo(baseURL + "/account/favorites");
    const noFavsIsVisible = await favoritesPage.noFavoritesIsVisible();
    assert.isTrue(noFavsIsVisible, "Expected 'There are no favorites yet.' message to be visible");

    // And the User is on the Combination Pliers page
    await homePage.navigateTo(baseURL);
    const combinationPliersIsVisible = await homePage.productIsVisible("Combination Pliers");
    assert.isTrue(combinationPliersIsVisible, "Expected 'Combination pliers.' to be visible");

    await homePage.clickOnProduct("Combination Pliers");

    // When the User adds the Combination Pliers to Favorites
    await productPage.addToFavoritesClick();

    // Then the message "Product added to your favorites list." is displayed
    const addedToFavoritesVisible = await productPage.alertIsVisible("Product added to your");
    assert.isTrue(addedToFavoritesVisible, "Expected alert 'Product added to your' to be visible");

    // And the Combination Pliers are shown in the Favorites page
    await favoritesPage.navigateTo(baseURL + "/account/favorites");
    await favoritesPage.waitForURL(baseURL + "/account/favorites");
    const favoritesURL = favoritesPage.getURL();
    assert.equal(favoritesURL, "https://practicesoftwaretesting.com/account/favorites");

    const combinationPliersIsFavorite = await favoritesPage.productIsVisible("Combination Pliers");
    assert.isTrue(combinationPliersIsFavorite, "Expected Combination Pliers to be visible.");

    // (Remove the product for future re-test)
    await favoritesPage.deleteSingleFavorite();
    const noFavsisVisible = await favoritesPage.noFavoritesIsVisible();
    assert.isTrue(noFavsisVisible, "Expected 'There are no favorites yet.' message to be visible");
  });

  test("add an out-of-stock product to the cart", async ({ page, baseURL }) => {
    const favoritesPage = new FavoritesPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // And the User is on the Long Nose Pliers page
    await homePage.navigateTo(baseURL);
    const longNosePliersIsVisible = await homePage.productIsVisible("Long Nose Pliers");
    assert.isTrue(longNosePliersIsVisible, "Expected 'Combination pliers.' to be visible");

    await homePage.clickOnProduct("Long Nose Pliers");

    // When the Long Nose Pliers page has the "Out of stock" message
    const outOfStockIsVisible = await productPage.outOfStockIsVisible();
    assert.isTrue(outOfStockIsVisible, "Expected Out Of Stock message to be visible.");

    // Then the Quantity selector and the "Add to cart" button are disabled
    const decreasedAttr = await productPage.getAttribute(productPage.decrease, "disabled");
    assert.strictEqual(decreasedAttr, "", "Expected 'disabled' attribute on decrease");

    const increaseAttr = await productPage.getAttribute(productPage.increase, "disabled");
    assert.strictEqual(increaseAttr, "", "Expected 'disabled' attribute on increase");
  });
});
