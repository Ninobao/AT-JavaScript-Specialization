import { test } from "@playwright/test";
import { expect as chaiExpect } from "chai";

import HomePage from "../src/po/pages/HomePage";
import LoginPage from "../src/po/pages/LoginPage";
import RegisterPage from "../src/po/pages/RegisterPage";

test.describe("sign up/sign in tests", () => {
  test("user creates an account", async ({ page, baseURL }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    const uniqueEmail = `user_${Date.now()}@example.com`;

    // Given the User does not have an account
    await homePage.navigateTo(baseURL);
    await homePage.header.signInLinkClick();
    await loginPage.registerLinkClick();

    await registerPage.fillProfileFields({
      firstName: "FirstName",
      lastName: "LastName",
      dateOfBirth: "2000-01-01",
      street: "Arcos",
      postalCode: "20000",
      city: "Aguascalientes",
      state: "Ags",
      country: "MX",
      phone: "123456",
      email: uniqueEmail,
      password: "123_Tests",
    });
    await registerPage.registerBtnClick();

    // Then the User gets redirected to the login page
    await loginPage.waitForURL(baseURL + `/auth/login`);
    const loginURL = page.url();
    chaiExpect(loginURL).to.equal("https://practicesoftwaretesting.com/auth/login");
  });

  test("invalid Date of Birth when creating an account", async ({ page, baseURL }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    const uniqueEmail = `user_${Date.now()}@example.com`;

    // Given the User does not have an account
    await homePage.navigateTo(baseURL);
    await homePage.header.signInLinkClick();
    await loginPage.registerLinkClick();

    // And the User is on the Registration page
    // When the User fills the required fields with valid data
    await registerPage.fillProfileFields({
      firstName: "FirstName",
      lastName: "LastName",
      dateOfBirth: "2000-22-01", // But the Date of Birth is invalid
      street: "Arcos",
      postalCode: "20000",
      city: "Aguascalientes",
      state: "Ags",
      country: "MX",
      phone: "123456",
      email: uniqueEmail,
      password: "123_Tests",
    });
    await registerPage.registerBtnClick();

    // Then the message "Please enter a valid date in YYYY-MM-DD format." is displayed
    const dobErrorIsVisible = await registerPage.dobError.isVisible();
    chaiExpect(dobErrorIsVisible).to.be.true;
  });
});
