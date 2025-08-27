import { test, expect } from "@playwright/test";
import chai from "chai";
chai.should();

test.describe("home page", () => {
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

  test("Showing products according to filters", async ({ page }) => {
    // And the User is on the Home page
    await page.goto("/");

    await page.waitForLoadState();

    // When the User adds only the "Tool Belts" filter
    await expect(page.getByRole("checkbox", { name: "Tool Belts" })).toBeVisible();
    // Chai assert:
    const checkboxVisible = await page.getByRole("checkbox", { name: "Tool Belts" }).isVisible();
    checkboxVisible.should.be.true;

    await page.getByRole("checkbox", { name: "Tool Belts" }).check();

    // Then only the "Leather toolbelt" product will be shown
    await expect(
      page.locator('[data-test="product-name"]', {
        hasText: "Leather toolbelt",
      })
    ).toBeVisible();
    // Chai assert:
    const toolbeltVisible = await page
      .locator('[data-test="product-name"]', {
        hasText: "Leather toolbelt",
      })
      .isVisible();
    toolbeltVisible.should.be.true;
  });

  test("Not showing products according to filters", async ({ page }) => {
    // And the User is on the Home page
    await page.goto("/");

    // When the User adds only the "Workbench" filter
    await expect(page.getByRole("checkbox", { name: "Workbench" })).toBeVisible();
    // Chai assert:
    const checkboxVisible = await page.getByRole("checkbox", { name: "Workbench" }).isVisible();
    checkboxVisible.should.be.true;

    await page.getByRole("checkbox", { name: "Workbench" }).check();

    // Then the "There are no products found." message is displayed
    await expect(
      page.locator('[data-test="no-results"]', {
        hasText: "There are no products found.",
      })
    ).toBeVisible();
    // Chai assert:
    const noProductsVisible = await page
      .locator('[data-test="no-results"]', {
        hasText: "There are no products found.",
      })
      .isVisible();
    noProductsVisible.should.be.true;
  });
});
