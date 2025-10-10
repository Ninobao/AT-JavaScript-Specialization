import { Given, When, Then } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { expect as chaiExpect } from 'chai';

import HomePage from '../../src/po/pages/home.page.js';
import LoginPage from '../../src/po/pages/login.page.js';
import RegisterPage from '../../src/po/pages/register.page.js';
import Header from '../../src/po/components/header.component.js';

import { testUser } from '../../src/data/user.data.js';

let browser = await chromium.launch();
let context = await browser.newContext();
let page = await context.newPage();

const homePage = new HomePage(page);
const loginPage = new LoginPage(page);
const header = new Header(page);
let baseURL = 'https://practicesoftwaretesting.com';

const registerPage = new RegisterPage(page);
const uniqueEmail = `user_${Date.now()}@example.com`;

Given('the User is on the home page', async function () {
  await homePage.navigateTo(baseURL);
});

Given('the User navigates to the Registration page', async function () {
  await header.signInLinkClick();
  await loginPage.registerLink.click();
  await loginPage.waitForURL('https://practicesoftwaretesting.com/auth/register');
});

When('the User fills all required fields with valid data', async function () {
  await registerPage.fillProfileFields({
    ...testUser,
    email: uniqueEmail,
  });
});

When('the User clicks the register button', async function () {
  await registerPage.registerBtn.click();
});

Then('the User gets redirected to the login page', async function () {
  await loginPage.waitForURL(baseURL + `/auth/login`);
  const loginURL = page.url();
  chaiExpect(loginURL).to.equal('https://practicesoftwaretesting.com/auth/login');
});

// 2nd scenario
When('the User fills the required fields with valid data', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('the Date of Birth is invalid', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the message {string} is displayed', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
