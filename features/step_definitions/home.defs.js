import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { assert, should } from 'chai';

import LoginPage from '../../src/po/pages/login.page.js';
import RegisterPage from '../../src/po/pages/register.page.js';
import HomePage from '../../src/po/pages/home.page.js';

import { testUser } from '../../src/data/user.data.js';

setDefaultTimeout(60 * 1000);

should();

Given('the User logs in', async function () {
  const registerPage = new RegisterPage(this.page);
  const loginPage = new LoginPage(this.page);

  await this.context.clearCookies();

  await registerPage.navigateTo(this.baseURL + '/auth/register');

  await registerPage.fillProfileFields({
    ...testUser,
  });

  try {
    await registerPage.registerBtn.click();
    await expect(this.page).toHaveURL(this.baseURL + '/auth/login');
    console.log('Account created');
  } catch (err) {
    console.log('The account was already created');
  }

  await loginPage.navigateTo(this.baseURL + '/auth/login');
  await loginPage.enterCredentials('email@example.com', '123_Tests');
  await loginPage.loginSubmit.click();
});

Given('the User gets redirected to the account page', async function () {
  const loginPage = new LoginPage(this.page);

  await loginPage.waitForURL(this.baseURL + '/account');
  const accountURL = this.page.url();
  assert.equal(accountURL, 'https://practicesoftwaretesting.com/account');
});

Given('the User navigates to the Home page', async function () {
  const homePage = new HomePage(this.page);

  await homePage.navigateTo(this.baseURL);
});

When('the User adds only the Tool Belts filter', async function () {
  const homePage = new HomePage(this.page);

  const checkboxToolBeltsVisible = await homePage.isVisible(homePage.toolBeltsCheckbox);
  checkboxToolBeltsVisible.should.be.true;
  await homePage.addProductsFilter(homePage.toolBeltsCheckbox);
});

Then('only the Leather toolbelt product will be shown', async function () {
  const homePage = new HomePage(this.page);

  const toolBeltvisible = await homePage.productIsVisible('Leather toolbelt');
  toolBeltvisible.should.be.true;
});

When('the User adds only the Workbench filter', async function () {
  const homePage = new HomePage(this.page);

  const checkboxWorkbenchVisible = await homePage.isVisible(homePage.workbenchCheckbox);
  checkboxWorkbenchVisible.should.be.true;
  await homePage.addProductsFilter(homePage.workbenchCheckbox);
});

Then('the There are no products found. message is displayed', async function () {
  const homePage = new HomePage(this.page);

  const noProductsVisible = await homePage.isVisible(homePage.noProductsFoundMsg);
  noProductsVisible.should.be.true;
});
