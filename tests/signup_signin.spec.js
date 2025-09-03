import { test } from "@playwright/test";
import { expect as chaiExpect } from "chai";

import HomePage from "../src/po/pages/HomePage";
import LoginPage from "../src/po/pages/LoginPage";
import RegisterPage from "../src/po/pages/RegisterPage";

test.describe("sign up/sign in tests", () => {
  test("user creates an account", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    const uniqueEmail = `user_${Date.now()}@example.com`;

    // Given the User does not have an account
    // await page.goto("/");
    // await page.locator('[data-test="nav-sign-in"]').click();
    await homePage.navigateTo();
    await homePage.signInLink.click();

    // await page.locator('[data-test="register-link"]').click();
    await loginPage.registerLink.click();

    await page.waitForLoadState();

    // And the User is on the Registration page
    // When the User fills all required fields with valid data
    // await page.locator('[data-test="first-name"]').fill("FirstName");
    // await page.locator('[data-test="last-name"]').fill("LastName");
    // await page.locator('[data-test="dob"]').fill("2000-01-01");
    // await page.locator('[data-test="street"]').fill("Arcos");
    // await page.locator('[data-test="postal_code"]').fill("20000");
    // await page.locator('[data-test="city"]').fill("Aguascalientes");
    // await page.locator('[data-test="state"]').fill("Ags");
    // await page.locator('[data-test="country"]').selectOption("MX");
    // await page.locator('[data-test="phone"]').fill("123456");
    // await page.locator('[data-test="email"]').fill(uniqueEmail);
    // await page.locator('[data-test="password"]').fill("123_Tests");
    await registerPage.createAccount(
      "FirstName",
      "LastName",
      "2000-01-01",
      "Arcos",
      "20000",
      "Aguascalientes",
      "Ags",
      "MX",
      "123456",
      uniqueEmail,
      "123_Tests"
    );

    // await page.locator('[data-test="register-submit"]').click();

    // Then the User gets redirected to the login page
    await page.waitForURL("https://practicesoftwaretesting.com/auth/login");
    const loginURL = page.url();
    chaiExpect(loginURL).to.equal("https://practicesoftwaretesting.com/auth/login");
  });

  test("invalid Date of Birth when creating an account", async ({ page }) => {
    const uniqueEmail = `user_${Date.now()}@example.com`;

    // Given the User does not have an account
    await page.goto("/");
    await page.locator('[data-test="nav-sign-in"]').click();

    // And the User is on the Registration page
    await page.locator('[data-test="register-link"]').click();

    // When the User fills the required fields with valid data
    await page.locator('[data-test="first-name"]').fill("FirstName");
    await page.locator('[data-test="last-name"]').fill("LastName");
    await page.locator('[data-test="street"]').fill("Arcos");
    await page.locator('[data-test="postal_code"]').fill("20000");
    await page.locator('[data-test="city"]').fill("Aguascalientes");
    await page.locator('[data-test="state"]').fill("Ags");
    await page.locator('[data-test="country"]').selectOption("MX");
    await page.locator('[data-test="phone"]').fill("123456");
    await page.locator('[data-test="email"]').fill(uniqueEmail);
    await page.locator('[data-test="password"]').fill("123_Tests");

    // But the Date of Birth is invalid
    await page.locator('[data-test="dob"]').fill("2000-22-01");

    await page.locator('[data-test="register-submit"]').click();

    // Then the message "Please enter a valid date in YYYY-MM-DD format." is displayed
    const dobError = page.locator('[data-test="dob-error"]', {
      hasText: "Please enter a valid date",
    });
    const dobErrorIsVisible = await dobError.isVisible();
    chaiExpect(dobErrorIsVisible).to.be.true;
  });
});
