import { test, expect } from "@playwright/test";
import { expect as chaiExpect } from "chai";

test.describe("checkout page", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();

    await page.goto("https://practicesoftwaretesting.com/auth/register");

    await page.waitForLoadState();
    await page.locator('[data-test="first-name"]').fill("FirstName");
    await page.locator('[data-test="last-name"]').fill("LastName");
    await page.locator('[data-test="dob"]').fill("2000-01-01");
    await page.locator('[data-test="street"]').fill("Arcos");
    await page.locator('[data-test="postal_code"]').fill("20000");
    await page.locator('[data-test="city"]').fill("Aguascalientes");
    await page.locator('[data-test="state"]').fill("Ags");
    await page.locator('[data-test="country"]').selectOption("MX");
    await page.locator('[data-test="phone"]').fill("123456");
    await page.locator('[data-test="email"]').fill("email@example.com");
    await page.locator('[data-test="password"]').fill("123_Tests");

    try {
      await page.locator('[data-test="register-submit"]').click();
      await expect(page).toHaveURL("https://practicesoftwaretesting.com/auth/login");
      console.log("Account created");
    } catch (err) {
      console.log("The account was already created");
    }

    // Given the user is logged
    await page.goto("/auth/login");
    await page.locator('[data-test="email"]').fill("email@example.com");
    await page.locator('[data-test="password"]').fill("123_Tests");
    await page.locator('[data-test="login-submit"]').click();
    await page.waitForURL("https://practicesoftwaretesting.com/account");
    const accountURL = page.url();
    chaiExpect(accountURL).to.equal("https://practicesoftwaretesting.com/account");
  });

  test("Checkout calculates total price correctly", async ({ page }) => {
    // And the User adds one Combination Pliers and two Bolt Cutters to the cart
    await page.goto("/");
    await page.waitForLoadState();

    // One Combination Pliers:
    const pliers = page.getByText("Combination Pliers");
    await pliers.waitFor({ state: "visible", timeout: 3500 });
    const pliersIsVisible = await pliers.isVisible();
    chaiExpect(pliersIsVisible).to.be.true;

    await pliers.click();

    const addToCart = page.locator('[data-test="add-to-cart"]');
    await addToCart.waitFor({ state: "visible", timeout: 3500 });
    const addToCartVisible = await addToCart.isVisible();
    chaiExpect(addToCartVisible).to.be.true;

    await addToCart.click();

    const productAdded = page.getByRole("alert", { name: "Product added to shopping" });
    await productAdded.waitFor({ state: "visible", timeout: 3500 });
    const productAddedVisible = await productAdded.isVisible();
    chaiExpect(productAddedVisible).to.be.true;

    // Return to Home Page
    await page.getByRole("link", { name: "Practice Software Testing -" }).click();
    await page.waitForLoadState();

    // Two Bolt Cutters
    const boltCutters = page.getByText("Bolt Cutters");
    await boltCutters.waitFor({ state: "visible", timeout: 3500 });
    const boltCuttersVisible = await boltCutters.isVisible();
    chaiExpect(boltCuttersVisible).to.be.true;

    await boltCutters.click();
    await page.waitForLoadState();

    const increase = page.locator('[data-test="increase-quantity"]');
    await increase.waitFor({ state: "visible", timeout: 3500 });
    const increaseVisible = await increase.isVisible();
    chaiExpect(increaseVisible).to.be.true;

    await increase.click();

    const addCart = page.locator('[data-test="add-to-cart"]');
    await addCart.waitFor({ state: "visible", timeout: 3500 });
    const addCartVisible = await addCart.isVisible();
    chaiExpect(addCartVisible).to.be.true;

    await addCart.click();

    const productAdd = page.getByRole("alert", { name: "Product added to shopping" });
    await productAdd.waitFor({ state: "visible", timeout: 3500 });
    const productAddVisible = await productAdd.isVisible();
    chaiExpect(productAddVisible).to.be.true;

    // When the User goes to the Checkout page
    const navCart = page.locator('[data-test="nav-cart"]');
    await navCart.waitFor({ state: "visible", timeout: 3500 });
    const navCartVisible = await navCart.isVisible();
    chaiExpect(navCartVisible).to.be.true;

    await page.waitForLoadState();

    await navCart.click();
    await page.waitForURL("/checkout");
    await page.waitForLoadState();

    // And the sub-total price of the Combination Pliers is $14.15
    const linePrice1 = page.locator('[data-test="line-price"]', { hasText: "$14.15" });
    await linePrice1.waitFor({ state: "visible", timeout: 3500 });
    const linePrice1Visible = await linePrice1.isVisible();
    chaiExpect(linePrice1Visible).to.be.true;

    // And the sub-total price of the Bolt Cutters is $96.82
    const linePrice2 = page.locator('[data-test="line-price"]', { hasText: "$96.82" });
    await linePrice2.waitFor({ state: "visible", timeout: 3500 });
    const linePrice2Visible = await linePrice2.isVisible();
    chaiExpect(linePrice2Visible).to.be.true;

    // Then the total price of the cart is $110.97
    const cartTotal = page.locator('[data-test="cart-total"]', { hasText: "$110.97" });
    await cartTotal.waitFor({ state: "visible", timeout: 3500 });
    const cartTotalVisible = await cartTotal.isVisible();
    chaiExpect(cartTotalVisible).to.be.true;

    await page.waitForLoadState();

    // Empty the cart for future re-test
    const emptyPliers = page
      .getByRole("row", { name: "Combination Pliers  Quantity" })
      .locator("a");
    await emptyPliers.waitFor({ state: "visible", timeout: 3500 });
    const emptyPliersVisible = await emptyPliers.isVisible();
    chaiExpect(emptyPliersVisible).to.be.true;

    await emptyPliers.click();

    const productDeleted = page.getByRole("alert", { name: "Product deleted." });
    await productDeleted.waitFor({ state: "visible", timeout: 3500 });
    const productDeletedVisible = await productDeleted.isVisible();
    chaiExpect(productDeletedVisible).to.be.true;

    const emptyBoltCutters = page.getByRole("row", { name: "Bolt Cutters Quantity" }).locator("a");
    await emptyBoltCutters.waitFor({ state: "visible", timeout: 3500 });
    const emptyBoltCuttersVisible = await emptyBoltCutters.isVisible();
    chaiExpect(emptyBoltCuttersVisible).to.be.true;

    await emptyBoltCutters.click();

    const productDeleted2 = page.getByRole("alert", { name: "Product deleted." });
    await productDeleted2.waitFor({ state: "visible", timeout: 3500 });
    const productDeleted2Visible = await productDeleted2.isVisible();
    chaiExpect(productDeleted2Visible).to.be.true;

    // Cart completely empty:
    const cartEmpty = page.getByText("The cart is empty. Nothing to");
    await cartEmpty.waitFor({ state: "visible", timeout: 5000 });
    const cartEmptyVisible = await cartEmpty.isVisible();
    chaiExpect(cartEmptyVisible).to.be.true;
  });
});
