import { Given, When, Then } from '@cucumber/cucumber';
import { expect as chaiExpect } from 'chai';

import AccountPage from '../../src/po/pages/account.page.js';
import ProfilePage from '../../src/po/pages/profile.page.js';

Given('the User navigates to the Profile page', async function () {
  const accountPage = new AccountPage(this.page);
  const profilePage = new ProfilePage(this.page);

  await accountPage.profileLink.click();
  await accountPage.waitForURL(this.baseURL + '/account/profile');
  const profileURL = profilePage.getURL();
  chaiExpect(profileURL).to.equal('https://practicesoftwaretesting.com/account/profile');
});

When('the User updates Street and Postal code fields with valid data', async function () {
  const profilePage = new ProfilePage(this.page);

  const streetValue = await profilePage.getStreet();
  chaiExpect(streetValue).to.match(/.+/);
  const postalCodeValue = await profilePage.getPostalCode();
  chaiExpect(postalCodeValue).to.match(/.+/);

  await profilePage.setStreetRandom();
  await profilePage.setPostalCodeRandom();
});

When('the User clicks the Update profile button', async function () {
  const profilePage = new ProfilePage(this.page);

  await profilePage.updateProfileBtn.click();
});

Then('the message Your profile is successfully updated! is displayed', async function () {
  const profilePage = new ProfilePage(this.page);

  const updateMsgVisible = await profilePage.isVisible(profilePage.updateProfileSuccess);
  chaiExpect(updateMsgVisible).to.be.true;
});
