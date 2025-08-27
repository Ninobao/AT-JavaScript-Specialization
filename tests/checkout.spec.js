import { test, expect } from "@playwright/test";
import chai from "chai";
chai.should();

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
      console.log("cuenta creada");
    } catch (err) {
      await page.getByText("A customer with this email address already exists.");
      console.log("la cuenta ya estaba creada");
    }

    // Given the user is logged
    await page.goto("/auth/login");
    await page.locator('[data-test="email"]').fill("email@example.com");
    await page.locator('[data-test="password"]').fill("123_Tests");
    await page.locator('[data-test="login-submit"]').click();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/account");
    // Chai should:
    await page.waitForURL("https://practicesoftwaretesting.com/account");
    const accountURL = await page.url();
    accountURL.should.equal("https://practicesoftwaretesting.com/account");
  });

  test("Checkout calculates total price correctly", async ({ page }) => {
    // And the User adds one Combination Pliers and two Bolt Cutters to the cart
    await page.goto("/");
    await page.waitForLoadState();
    // One Combination Pliers
    await expect(page.getByText("Combination Pliers")).toBeVisible();
    // Chai should:
    const pliersIsVisible = await page.getByText("Combination Pliers").isVisible();
    pliersIsVisible.should.be.true;

    await page.getByText("Combination Pliers").click();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
    // Chai should:
    const addToCartVisible = await page.locator('[data-test="add-to-cart"]').isVisible();
    addToCartVisible.should.be.true;

    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.getByRole("alert", { name: "Product added to shopping" })).toBeVisible();
    // Chai should:
    const productAddedVisible = await page.getByRole("alert", { name: "Product added to shopping" }).isVisible();
    productAddedVisible.should.be.true;

    // Return to Home Page
    await page.getByRole("link", { name: "Practice Software Testing -" }).click();

    // Two Bolt Cutters
    await expect(page.getByText("Bolt Cutters")).toBeVisible();
    // Chai assert:
    const boltCuttersVisible = await page.getByText("Bolt Cutters").isVisible();
    boltCuttersVisible.should.be.true;

    await page.getByText("Bolt Cutters").click();
    await expect(page.locator('[data-test="increase-quantity"]')).toBeVisible();
    // Chai assert:
    const increaseVisible = await page.locator('[data-test="increase-quantity"]').isVisible();
    increaseVisible.should.be.true;

    await page.locator('[data-test="increase-quantity"]').click();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
    // Chai assert:
    const addCartVisible = await page.locator('[data-test="add-to-cart"]').isVisible();
    addCartVisible.should.be.true;

    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.getByRole("alert", { name: "Product added to shopping" })).toBeVisible();
    // Chai assert:
    const productAddVisible = await page.getByRole("alert", { name: "Product added to shopping" }).isVisible();
    productAddVisible.should.be.true;

    // When the User goes to the Checkout page
    await expect(page.locator('[data-test="nav-cart"]')).toBeVisible();
    // Chai assert:
    const navCartVisible = await page.locator('[data-test="nav-cart"]').isVisible();
    navCartVisible.should.be.true;

    await page.locator('[data-test="nav-cart"]').click();
    await page.waitForLoadState();

    // And the sub-total price of the Combination Pliers is $14.15
    await expect(page.locator('[data-test="line-price"]', { hasText: "$14.15" })).toBeVisible();
    // Chai assert:
    const linePrice1Visible = await page.locator('[data-test="line-price"]', { hasText: "$14.15" }).isVisible();
    linePrice1Visible.should.be.true;

    // And the sub-total price of the Bolt Cutters is $96.82
    await expect(page.locator('[data-test="line-price"]', { hasText: "$96.82" })).toBeVisible();
    // Chai assert:
    const linePrice2Visible = await page.locator('[data-test="line-price"]', { hasText: "$96.82" }).isVisible();
    linePrice2Visible.should.be.true;

    // Then the total price of the cart is $110.97
    await expect(page.locator('[data-test="cart-total"]', { hasText: "$110.97" })).toBeVisible();
    // Chai assert:
    const cartTotalVisible = await page.locator('[data-test="cart-total"]', { hasText: "$110.97" }).isVisible();
    cartTotalVisible.should.be.true;

    await page.waitForLoadState();

    // Empty the cart for future re-test
    await expect(page.getByRole("row", { name: "Combination Pliers  Quantity" }).locator("a")).toBeVisible();
    await page.getByRole("row", { name: "Combination Pliers  Quantity" }).locator("a").click();
    await expect(page.getByRole("alert", { name: "Product deleted." })).toBeVisible();
    // Chai assert:
    const productDeleted1Visible = await page.getByRole("alert", { name: "Product deleted." }).isVisible();
    productDeleted1Visible.should.be.true;

    await page.getByRole("row", { name: "Bolt Cutters Quantity" }).locator("a").click();
    await expect(page.getByRole("alert", { name: "Product deleted." })).toBeVisible();
    // Chai assert:
    const productDeleted2Visible = await page.getByRole("alert", { name: "Product deleted." }).isVisible();
    productDeleted2Visible.should.be.true;

    await expect(page.getByText("The cart is empty. Nothing to")).toBeVisible();
    // Chai assert:
    const cartEmptyVisible = await page.getByText("The cart is empty. Nothing to").isVisible();
    cartEmptyVisible.should.be.true;
  });
});
