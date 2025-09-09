import { test, expect } from "@playwright/test";
import { assert, expect as chaiExpect } from "chai";

import LoginPage from "../po/pages/LoginPage";
import RegisterPage from "../po/pages/RegisterPage";
import HomePage from "../po/pages/HomePage";
import ProductPage from "../po/pages/ProductPage";
import CheckoutPage from "../po/pages/CheckoutPage";

import HeaderComponent from "../po/components/header.component.js";

import { testUser } from "../data/userData.js";

test.describe("checkout page", () => {
  test.beforeEach(async ({ page, context, baseURL }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await context.clearCookies();

    await registerPage.navigateTo(baseURL + "/auth/register");

    await registerPage.fillProfileFields({
      ...testUser,
    });

    try {
      await registerPage.clickOn(registerPage.registerBtn);
      await expect(page).toHaveURL(baseURL + "/auth/login");
      console.log("Account created");
    } catch (err) {
      console.log("The account was already created");
    }

    // Given the user is logged
    await loginPage.navigateTo(baseURL + "/auth/login");
    await loginPage.enterCredentials("email@example.com", "123_Tests");
    await loginPage.clickOn(loginPage.loginSubmit);
    await loginPage.waitForURL(baseURL + "/account");
    const accountURL = page.url();
    assert.equal(accountURL, "https://practicesoftwaretesting.com/account");
  });

  test("Checkout calculates total price correctly", async ({ page, baseURL }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    const header = new HeaderComponent(page);

    // And the User adds one Combination Pliers and two Bolt Cutters to the cart
    await homePage.navigateTo(baseURL);

    // One Combination Pliers:
    const pliersIsVisible = await homePage.productIsVisible("Combination Pliers");
    chaiExpect(pliersIsVisible).to.be.true;

    await homePage.clickOnProduct("Combination Pliers");

    // const addToCartVisible = await productPage.addToCartIsVisible();
    const addToCartVisible = await productPage.isVisible(productPage.addToCart);
    chaiExpect(addToCartVisible).to.be.true;

    await productPage.clickOn(productPage.addToCart);
    const productAddedVisible = await productPage.alertIsVisible("Product added to shopping");
    chaiExpect(productAddedVisible).to.be.true;

    // Return to Home Page
    await header.logoLinkClick();

    // Two Bolt Cutters
    const boltCuttersVisible = await homePage.productIsVisible("Bolt Cutters");
    chaiExpect(boltCuttersVisible).to.be.true;

    await homePage.clickOnProduct("Bolt Cutters");

    const increaseVisible = await productPage.isVisible(productPage.increase);
    chaiExpect(increaseVisible).to.be.true;

    await productPage.clickOn(productPage.increase);

    const addCartVisible = await productPage.isVisible(productPage.addToCart);
    chaiExpect(addCartVisible).to.be.true;

    await productPage.clickOn(productPage.addToCart);
    const productAddVisible = await productPage.alertIsVisible("Product added to shopping");
    chaiExpect(productAddVisible).to.be.true;

    // When the User goes to the Checkout page
    const navCartVisible = await productPage.isVisible(productPage.cartLink);
    chaiExpect(navCartVisible).to.be.true;

    await productPage.clickOn(productPage.cartLink);
    await checkoutPage.waitForURL(baseURL + "/checkout");

    // And the sub-total price of the Combination Pliers is $14.15
    const linePrice1Visible = await checkoutPage.linePriceIsVisible("$14.15");
    chaiExpect(linePrice1Visible).to.be.true;

    // And the sub-total price of the Bolt Cutters is $96.82
    const linePrice2Visible = await checkoutPage.linePriceIsVisible("$96.82");
    chaiExpect(linePrice2Visible).to.be.true;

    // Then the total price of the cart is $110.97
    const cartTotalVisible = await checkoutPage.cartTotalIsVisible("$110.97");
    chaiExpect(cartTotalVisible).to.be.true;

    // Empty the cart for future re-test
    const emptyPliersVisible = await checkoutPage.deleteProductIsVisible("Combination Pliers");
    chaiExpect(emptyPliersVisible).to.be.true;

    await checkoutPage.deleteProductClick("Combination Pliers");

    const productDeletedVisible = await checkoutPage.alertIsVisible("Product deleted.");
    chaiExpect(productDeletedVisible).to.be.true;

    // Now the Bolt Cutters:
    const emptyBoltCutters = await checkoutPage.deleteProductIsVisible("Bolt Cutters");
    chaiExpect(emptyBoltCutters).to.be.true;

    await checkoutPage.deleteProductClick("Bolt Cutters");

    const productDeleted2Visible = await checkoutPage.alertIsVisible("Product deleted.");
    chaiExpect(productDeleted2Visible).to.be.true;

    // Cart completely empty:
    const cartEmptyVisible = await checkoutPage.isVisible(checkoutPage.cartEmptyMsg);
    chaiExpect(cartEmptyVisible).to.be.true;
  });
});
