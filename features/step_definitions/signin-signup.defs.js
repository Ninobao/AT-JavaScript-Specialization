import { Given, When, Then } from '@cucumber/cucumber';
import { expect as chaiExpect } from 'chai';

import HomePage from '../../src/po/pages/home.page.js';
import LoginPage from '../../src/po/pages/login.page.js';
import RegisterPage from '../../src/po/pages/register.page.js';
import Header from '../../src/po/components/header.component.js';

import { testUser } from '../../src/data/user.data.js';

const uniqueEmail = `user_${Date.now()}@example.com`;

Given('the User is on the home page', async function () {
  const homePage = new HomePage(this.page);

  await homePage.navigateTo(this.baseURL);
});

Given('the User navigates to the Registration page', async function () {
  const loginPage = new LoginPage(this.page);
  const header = new Header(this.page);

  await header.signInLinkClick();
  await loginPage.registerLink.click();
  await loginPage.waitForURL('https://practicesoftwaretesting.com/auth/register');
});

When('the User fills all required fields with valid data', async function () {
  const registerPage = new RegisterPage(this.page);

  await registerPage.fillProfileFields({
    ...testUser,
    email: uniqueEmail,
  });
});

When('the User clicks the register button', async function () {
  const registerPage = new RegisterPage(this.page);

  await registerPage.registerBtn.click();
});

Then('the User gets redirected to the login page', async function () {
  const loginPage = new LoginPage(this.page);

  await loginPage.waitForURL(this.baseURL + `/auth/login`);
  const loginURL = this.page.url();
  chaiExpect(loginURL).to.equal('https://practicesoftwaretesting.com/auth/login');
});

When(
  'the User fills all required fields with valid data except the date of birth',
  async function () {
    const registerPage = new RegisterPage(this.page);

    await registerPage.fillProfileFields({
      ...testUser,
      dateOfBirth: '2000-22-01',
    });
  }
);

Then('the message {string} is displayed', async function (string) {
  const registerPage = new RegisterPage(this.page);

  string = await registerPage.dobError.isVisible();
  chaiExpect(string).to.be.true;
});
