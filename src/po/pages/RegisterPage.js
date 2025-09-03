import BasePage from "./BasePage";

class RegisterPage extends BasePage {
  constructor(page) {
    super(page, "auth/register");
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
  }

  async createAccount(
    firstName,
    lastName,
    dateOfBirth,
    street,
    postalCode,
    city,
    state,
    country,
    phone,
    email,
    password,
    registerBtn
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.dateOfBirth.fill(dateOfBirth);
    await this.street.fill(street);
    await this.postalCode.fill(postalCode);
    await this.city.fill(city);
    await this.state.fill(state);
    await this.country.selectOption(country);
    await this.phone.fill(phone);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.registerBtn.click();
  }
}

module.exports = RegisterPage;
