import { test, expect } from "@playwright/test";

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
  });

  test("Checkout calculates total price correctly", async ({ page }) => {
    // And the User adds one Combination Pliers and two Bolt Cutters to the cart
    await page.goto("/");
    // One Combination Pliers
    await page.waitForLoadState();
    await expect(page.getByText("Combination Pliers")).toBeVisible();
    await page.getByText("Combination Pliers").click();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.getByRole("alert", { name: "Product added to shopping" })).toBeVisible();

    // Return to Home Page
    await page.getByRole("link", { name: "Practice Software Testing -" }).click();

    // Two Bolt Cutters
    await expect(page.getByText("Bolt Cutters")).toBeVisible();
    await page.getByText("Bolt Cutters").click();
    await expect(page.locator('[data-test="increase-quantity"]')).toBeVisible();
    await page.locator('[data-test="increase-quantity"]').click();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.getByRole("alert", { name: "Product added to shopping" })).toBeVisible();

    // When the User goes to the Checkout page
    await page.waitForLoadState();
    await expect(page.locator('[data-test="nav-cart"]')).toBeVisible();
    await page.locator('[data-test="nav-cart"]').click();

    // And the sub-total price of the Combination Pliers is $14.15
    await expect(page.locator('[data-test="line-price"]', { hasText: "$14.15" })).toBeVisible();

    // And the sub-total price of the Bolt Cutters is $96.82
    await expect(page.locator('[data-test="line-price"]', { hasText: "$96.82" })).toBeVisible();

    // Then the total price of the cart is $110.97
    await expect(page.locator('[data-test="cart-total"]', { hasText: "$110.97" })).toBeVisible();

    await page.waitForLoadState();

    // Empty the cart for future re-test
    await page.getByRole("row", { name: "Combination Pliers  Quantity" }).locator("a").click();
    await expect(page.getByRole("alert", { name: "Product deleted." })).toBeVisible();
    await page.getByRole("row", { name: "Bolt Cutters Quantity" }).locator("a").click();
    await expect(page.getByRole("alert", { name: "Product deleted." })).toBeVisible();

    await page.waitForLoadState();

    await expect(page.getByText("The cart is empty. Nothing to")).toBeVisible();
  });
});
