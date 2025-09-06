import { test, expect } from "@playwright/test";
import { assert, expect as chaiExpect } from "chai";

import RegisterPage from "../po/pages/RegisterPage";
import LoginPage from "../po/pages/LoginPage";
import AccountPage from "../po/pages/AccountPage";
import ProfilePage from "../po/pages/ProfilePage";
import { testUser } from "./data/userData";

test.describe("user profile", () => {
  test.beforeEach(async ({ page, context, baseURL }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await context.clearCookies();

    await registerPage.navigateTo(baseURL + "/auth/register");

    await registerPage.fillProfileFields({
      ...testUser,
    });

    try {
      await registerPage.registerBtnClick();
      await expect(page).toHaveURL(baseURL + "/auth/login");
      console.log("Account created");
    } catch (err) {
      console.log("The account was already created");
    }

    // Given the user is logged
    await loginPage.navigateTo(baseURL + "/auth/login");
    await loginPage.enterCredentials("email@example.com", "123_Tests");
    const accountURL = page.url();
    assert.equal(accountURL, "https://practicesoftwaretesting.com/account");
  });

  test("user updates the profile", async ({ page, baseURL }) => {
    const accountPage = new AccountPage(page);
    const profilePage = new ProfilePage(page);

    // And the User is on the Profile page
    await accountPage.profileLinkClick();
    const profileURL = profilePage.getURL();
    chaiExpect(profileURL).to.equal("https://practicesoftwaretesting.com/account/profile");

    // When the User updates "Street" and "Postal code" fields with valid data
    const streetValue = await profilePage.getStreet();
    chaiExpect(streetValue).to.match(/.+/);

    const postalCodeValue = await profilePage.getPostalCode();
    chaiExpect(postalCodeValue).to.match(/.+/);

    // Setting new Street and Postal Code:
    await profilePage.setStreetRandom();
    await profilePage.setPostalCodeRandom();

    // And the User clicks the "Update profile" button
    const updateMsgVisible = await profilePage.submitProfiledUpdate();
    // Then the message "Your profile is successfully updated!" is displayed
    chaiExpect(updateMsgVisible).to.be.true;
  });
});
