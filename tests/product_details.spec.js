import { test, expect } from "@playwright/test";

test.describe("product details page", () => {
  test("user adds a product to Favorites", async ({ page }) => {
    // Given the User is logged
    await page.goto("/auth/login");
    await page.locator('[data-test="email"]').fill("email@example.com");
    await page.locator('[data-test="password"]').fill("123_Tests");
    await page.locator('[data-test="login-submit"]').click();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/account");

    // And the Combination Pliers product is not already in Favorites
    await page.goto("account/favorites");
    await expect(page.getByText("There are no favorites yet.")).toBeVisible();

    // And the User is on the Combination Pliers page
    await page.goto("/");
    await expect(page.getByText("Combination Pliers")).toBeVisible();
    await page.getByText("Combination Pliers").click();

    // When the User adds the Combination Pliers to Favorites
    await page.locator('[data-test="add-to-favorites"]').click();

    // Then the message "Product added to your favorites list." is displayed
    await expect(
      page.getByRole("alert", { name: "Product added to your" })
    ).toBeVisible();

    // And the Combination Pliers are shown in the Favorites page
    await page.goto("account/favorites");
    await expect(page).toHaveURL(
      "https://practicesoftwaretesting.com/account/favorites"
    );
    await expect(page.getByText("Combination Pliers")).toBeVisible();

    // (Remove the product for future re-test)
    await page.locator('[data-test="delete"]').click();
    await expect(page.getByText("There are no favorites yet.")).toBeVisible();
  });

  test("trying to add an out-of-stock product to the cart", async ({
    page,
  }) => {
    // Given the User is logged
    await page.goto("/auth/login");
    await page.locator('[data-test="email"]').fill("email@example.com");
    await page.locator('[data-test="password"]').fill("123_Tests");
    await page.locator('[data-test="login-submit"]').click();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/account");

    // And the User is on the Long Nose Pliers page
    await page.goto("/");
    await expect(page.getByText("Long Nose Pliers")).toBeVisible();
    await page.getByText("Long Nose Pliers").click();

    // When the Long Nose Pliers page has the "Out of stock" message
    await expect(page.locator('[data-test="out-of-stock"]')).toBeVisible();

    // Then the Quantity selector and the "Add to cart" button are disabled
    await expect(
      page.locator('[data-test="decrease-quantity"]')
    ).toHaveAttribute("disabled", "");
    await expect(
      page.locator('[data-test="increase-quantity"]')
    ).toHaveAttribute("disabled", "");
  });
});
