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
    await homePage.navigateTo();
    await homePage.signInLink.click();

    await loginPage.registerLink.click();
    await page.waitForLoadState();

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

    // Then the User gets redirected to the login page
    await page.waitForURL("/auth/login");
    const loginURL = page.url();
    chaiExpect(loginURL).to.equal("https://practicesoftwaretesting.com/auth/login");
  });

  test("invalid Date of Birth when creating an account", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    const uniqueEmail = `user_${Date.now()}@example.com`;

    // Given the User does not have an account
    await homePage.navigateTo();
    await homePage.signInLink.click();

    await loginPage.registerLink.click();
    await page.waitForLoadState();

    // And the User is on the Registration page
    // When the User fills the required fields with valid data
    // But the Date of Birth is invalid
    await registerPage.createAccount(
      "FirstName",
      "LastName",
      "2000-22-01",
      "Arcos",
      "20000",
      "Aguascalientes",
      "Ags",
      "MX",
      "123456",
      uniqueEmail,
      "123_Tests"
    );

    // Then the message "Please enter a valid date in YYYY-MM-DD format." is displayed
    const dobError = registerPage.dobError;
    const dobErrorIsVisible = await dobError.isVisible();
    chaiExpect(dobErrorIsVisible).to.be.true;
  });
});
