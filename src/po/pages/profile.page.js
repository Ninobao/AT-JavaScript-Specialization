import BasePage from './base.page.js';

class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.street = page.locator('[data-test="street"]');
    this.postalCode = page.locator('[data-test="postal_code"]');
    this.updateProfileBtn = page.locator('[data-test="update-profile-submit"]');
    this.updateProfileSuccess = page.getByText('Your profile is successfully updated!');
  }

  async getStreet() {
    await this.page.waitForLoadState('networkidle');
    return await this.street.inputValue();
  }

  async getPostalCode() {
    await this.page.waitForLoadState('networkidle');
    return await this.postalCode.inputValue();
  }

  async setStreetRandom() {
    const randomAppend = Date.now().toString().slice(-5);
    await this.street.fill('Arcos ' + `${randomAppend}`);
  }

  async setPostalCodeRandom() {
    const randomAppend = Date.now().toString().slice(-5);
    await this.postalCode.fill(randomAppend);
  }
}

export default ProfilePage;
