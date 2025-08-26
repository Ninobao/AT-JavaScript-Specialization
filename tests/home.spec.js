import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test("Showing products according to filters", async ({ page }) => {
    // Given the User is logged
    await page.goto("/auth/login");
    await page.locator('[data-test="email"]').fill("email@example.com");
    await page.locator('[data-test="password"]').fill("123_Tests");
    await page.locator('[data-test="login-submit"]').click();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/account");

    // And the User is on the Home page
    await page.goto("/");

    // When the User adds only the "Tool Belts" filter
    await expect(
      page.getByRole("checkbox", { name: "Tool Belts" })
    ).toBeVisible();
    await page.getByRole("checkbox", { name: "Tool Belts" }).check();

    // Then only the "Leather toolbelt" product will be shown
    await expect(
      page.locator('[data-test="product-name"]', {
        hasText: "Leather toolbelt",
      })
    ).toBeVisible();
  });

  test("Not showing products according to filters", async ({ page }) => {
    // Given the User is logged
    await page.goto("/auth/login");
    await page.locator('[data-test="email"]').fill("email@example.com");
    await page.locator('[data-test="password"]').fill("123_Tests");
    await page.locator('[data-test="login-submit"]').click();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/account");

    // And the User is on the Home page
    await page.goto("/");

    // When the User adds only the "Workbench" filter
    await expect(
      page.getByRole("checkbox", { name: "Workbench" })
    ).toBeVisible();
    await page.getByRole("checkbox", { name: "Workbench" }).check();

    // Then the "There are no products found." message is displayed
    await expect(
      page.locator('[data-test="no-results"]', {
        hasText: "There are no products found.",
      })
    ).toBeVisible();
  });
});
