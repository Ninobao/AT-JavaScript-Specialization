import { test } from "@playwright/test";
import { expect as chaiExpect } from "chai";

import HomePage from "../po/pages/HomePage";
import LoginPage from "../po/pages/LoginPage";
import RegisterPage from "../po/pages/RegisterPage";

import { testUser } from "../data/userData";

test.describe("sign up/sign in tests", () => {
  test("user creates an account", async ({ page, baseURL }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    const uniqueEmail = `user_${Date.now()}@example.com`;

    // Given the User does not have an account
    await homePage.navigateTo(baseURL);
    await homePage.header.signInLinkClick();
    // await loginPage.registerLinkClick();
    await loginPage.clickOn(loginPage.registerLink);

    await registerPage.fillProfileFields({
      ...testUser,
      email: uniqueEmail,
    });
    await registerPage.clickOn(registerPage.registerBtn);

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
    // await loginPage.registerLinkClick();
    await loginPage.clickOn(loginPage.registerLink);

    // And the User is on the Registration page
    // When the User fills the required fields with valid data
    await registerPage.fillProfileFields({
      ...testUser,
      dateOfBirth: "2000-22-01", // But the date of birth is invalid
    });
    await registerPage.clickOn(registerPage.registerBtn);

    // Then the message "Please enter a valid date in YYYY-MM-DD format." is displayed
    const dobErrorIsVisible = await registerPage.dobError.isVisible();
    chaiExpect(dobErrorIsVisible).to.be.true;
  });
});
