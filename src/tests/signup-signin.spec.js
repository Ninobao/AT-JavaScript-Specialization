import { test } from "@playwright/test";
import { expect as chaiExpect } from "chai";

import HomePage from "../po/pages/home.page";
import LoginPage from "../po/pages/login.page";
import RegisterPage from "../po/pages/register.page";
import Header from "../po/components/header.component";

import { testUser } from "../data/user.data";

test.describe("sign up/sign in tests", () => {
  test("user creates an account", async ({ page, baseURL }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const header = new Header(page);

    const uniqueEmail = `user_${Date.now()}@example.com`;

    // Given the User does not have an account
    await homePage.navigateTo(baseURL);
    await header.signInLinkClick();
    await loginPage.registerLink.click();

    await registerPage.fillProfileFields({
      ...testUser,
      email: uniqueEmail,
    });
    await registerPage.registerBtn.click();

    // Then the User gets redirected to the login page
    await loginPage.waitForURL(baseURL + `/auth/login`);
    const loginURL = page.url();
    chaiExpect(loginURL).to.equal("https://practicesoftwaretesting.com/auth/login");
  });

  test("invalid Date of Birth when creating an account", async ({ page, baseURL }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const header = new Header(page);

    // Given the User does not have an account
    await homePage.navigateTo(baseURL);
    await header.signInLinkClick();
    await loginPage.registerLink.click();

    // And the User is on the Registration page
    // When the User fills the required fields with valid data
    await registerPage.fillProfileFields({
      ...testUser,
      dateOfBirth: "2000-22-01", // But the date of birth is invalid
    });
    await registerPage.registerBtn.click();

    // Then the message "Please enter a valid date in YYYY-MM-DD format." is displayed
    const dobErrorIsVisible = await registerPage.dobError.isVisible();
    chaiExpect(dobErrorIsVisible).to.be.true;
  });
});
