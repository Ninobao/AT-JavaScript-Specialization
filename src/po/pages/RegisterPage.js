import BasePage from "./BasePage";

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.dateOfBirth = page.locator('[data-test="dob"]');
    this.street = page.locator('[data-test="street"]');
    this.postalCode = page.locator('[data-test="postal_code"]');
    this.city = page.locator('[data-test="city"]');
    this.state = page.locator('[data-test="state"]');
    this.country = page.locator('[data-test="country"]');
    this.phone = page.locator('[data-test="phone"]');
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.registerBtn = page.locator('[data-test="register-submit"]');

    this.dobError = page.locator('[data-test="dob-error"]', {
      hasText: "Please enter a valid date",
    });
  }

  async fillProfileFields(profile) {
    await this.firstName.fill(profile.firstName);
    await this.lastName.fill(profile.lastName);
    await this.dateOfBirth.fill(profile.dateOfBirth);
    await this.street.fill(profile.street);
    await this.postalCode.fill(profile.postalCode);
    await this.city.fill(profile.city);
    await this.state.fill(profile.state);
    await this.country.selectOption(profile.country);
    await this.phone.fill(profile.phone);
    await this.email.fill(profile.email);
    await this.password.fill(profile.password);
  }
}

module.exports = RegisterPage;
