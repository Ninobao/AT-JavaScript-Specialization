import { test, expect } from "@playwright/test";
import chai, { assert } from "chai";

import LoginPage from "../src/po/pages/LoginPage";
import RegisterPage from "../src/po/pages/RegisterPage";
import HomePage from "../src/po/pages/HomePage";

chai.should();

test.describe("home page", () => {
  test.beforeEach(async ({ page, context, baseURL }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await context.clearCookies();

    await registerPage.navigateTo(baseURL + "/auth/register");

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
      email: "email@example.com",
      password: "123_Tests",
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

  test("Showing products according to filters", async ({ page, baseURL }) => {
    const homePage = new HomePage(page);

    // And the User is on the Home page
    await homePage.navigateTo(baseURL);

    // // When the User adds only the "Tool Belts" filter
    const checkboxToolBeltsVisible = await homePage.checkboxIsVisible(homePage.toolBeltsCheckbox);
    checkboxToolBeltsVisible.should.be.true;
    await homePage.addProductsFilter(homePage.toolBeltsCheckbox);

    // Then only the "Leather toolbelt" product will be shown
    const toolBeltvisible = await homePage.productIsVisible("Leather toolbelt");
    toolBeltvisible.should.be.true;
  });

  test("Not showing products according to filters", async ({ page, baseURL }) => {
    const homePage = new HomePage(page);

    // And the User is on the Home page
    await homePage.navigateTo(baseURL);

    // When the User adds only the "Workbench" filter
    const checkboxWorkbenchVisible = await homePage.checkboxIsVisible(homePage.workbenchCheckbox);
    checkboxWorkbenchVisible.should.be.true;
    await homePage.addProductsFilter(homePage.workbenchCheckbox);

    // Then the "There are no products found." message is displayed
    const noProductsVisible = await homePage.noProductsFoundVisible();
    noProductsVisible.should.be.true;
  });
});
