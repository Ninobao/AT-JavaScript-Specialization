import { test, expect } from "@playwright/test";
import { assert } from "chai";

test.describe("product details page", () => {
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
    const accountURL = await page.url();
    assert.equal(accountURL, "https://practicesoftwaretesting.com/account");
  });

  test("user adds a product to Favorites", async ({ page }) => {
    // And the Combination Pliers product is not already in Favorites
    await page.goto("account/favorites");
    await page.waitForLoadState();

    const noFavoritesMessage = await page.getByText("There are no favorites yet.");
    await noFavoritesMessage.waitFor({ state: "visible" });
    const favoritesisVisible = await noFavoritesMessage.isVisible();
    assert.isTrue(
      favoritesisVisible,
      "Expected 'There are no favorites yet.' message to be visible"
    );

    // And the User is on the Combination Pliers page
    await page.goto("/");
    const combinationPliers = await page.getByText("Combination Pliers");
    await combinationPliers.waitFor({ state: "visible" });
    const combinationPliersisVisible = await combinationPliers.isVisible();
    assert.isTrue(combinationPliersisVisible, "Expected Combination Pliers to be visible.");

    await page.getByText("Combination Pliers").click();

    // When the User adds the Combination Pliers to Favorites
    await page.locator('[data-test="add-to-favorites"]').click();

    const addedAlertMessage = await page.getByRole("alert", {
      name: "Product added to your",
    });
    await addedAlertMessage.waitFor({ state: "visible" });
    const addedIsVisible = await addedAlertMessage.isVisible();
    assert.isTrue(addedIsVisible, "Expected alert 'Product added to your' to be visible");

    // And the Combination Pliers are shown in the Favorites page
    await page.goto("account/favorites");
    await page.waitForURL("https://practicesoftwaretesting.com/account/favorites");
    const favoritesURL = await page.url();
    assert.equal(favoritesURL, "https://practicesoftwaretesting.com/account/favorites");

    const pliers = await page.getByText("Combination Pliers");
    await pliers.waitFor({ state: "visible" });
    const pliersisVisible = await pliers.isVisible();
    assert.isTrue(pliersisVisible, "Expected Combination Pliers to be visible.");

    // (Remove the product for future re-test)
    await page.locator('[data-test="delete"]').click();
    const noFavsMessage = await page.getByText("There are no favorites yet.");
    await noFavsMessage.waitFor({ state: "visible" });
    const noFavsIsVisible = await noFavsMessage.isVisible();
    assert.isTrue(noFavsIsVisible, "Expected 'There are no favorites yet.' message to be visible");
  });

  test("add an out-of-stock product to the cart", async ({ page }) => {
    // And the User is on the Long Nose Pliers page
    await page.goto("/");
    await page.waitForLoadState();

    const nosePliers = await page.getByText("Combination Pliers");
    await nosePliers.waitFor({ state: "visible" });
    const nosePliersIsVisible = await nosePliers.isVisible();
    assert.isTrue(nosePliersIsVisible, "Expected Long Nose Pliers to be visible.");

    await page.getByText("Long Nose Pliers").click();

    // When the Long Nose Pliers page has the "Out of stock" message
    const outOfStock = await page.locator('[data-test="out-of-stock"]');
    await outOfStock.waitFor({ state: "visible" });
    const outOfStockIsVisible = await outOfStock.isVisible();
    assert.isTrue(outOfStockIsVisible, "Expected Out Of Stock message to be visible.");

    // Then the Quantity selector and the "Add to cart" button are disabled
    const decreasedAttr = await page
      .locator('[data-test="decrease-quantity"]')
      .getAttribute("disabled");
    assert.strictEqual(decreasedAttr, "", "Expected 'disabled' attribute on decrease");
    const increaseAttr = await page
      .locator('[data-test="increase-quantity"]')
      .getAttribute("disabled");
    assert.strictEqual(increaseAttr, "", "Expected 'disabled' attribute on increase");
  });
});
