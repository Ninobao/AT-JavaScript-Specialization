import { test, expect } from "@playwright/test";
import { expect as chaiExpect } from "chai";

test.describe("user profile", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();

    await page.goto("https://practicesoftwaretesting.com/auth/register");

    await page.waitForLoadState();
    await page.locator('[data-test="first-name"]').fill("FirstName");
    await page.locator('[data-test="last-name"]').fill("LastName");
    await page.locator('[data-test="dob"]').fill("2000-01-01");
    await page.locator('[data-test="street"]').fill("Arcos");
    await page.locator('[data-test="postal_code"]').fill("20000");
    await page.locator('[data-test="city"]').fill("Aguascalientes");
    await page.locator('[data-test="state"]').fill("Ags");
    await page.locator('[data-test="country"]').selectOption("MX");
    await page.locator('[data-test="phone"]').fill("123456");
    await page.locator('[data-test="email"]').fill("email@example.com");
    await page.locator('[data-test="password"]').fill("123_Tests");

    try {
      await page.locator('[data-test="register-submit"]').click();
      await expect(page).toHaveURL("https://practicesoftwaretesting.com/auth/login");
      console.log("Account created");
    } catch (err) {
      console.log("The account was already created");
    }

    // Given the user is logged
    await page.goto("/auth/login");
    await page.locator('[data-test="email"]').fill("email@example.com");
    await page.locator('[data-test="password"]').fill("123_Tests");
    await page.locator('[data-test="login-submit"]').click();
    await page.waitForURL("https://practicesoftwaretesting.com/account");
    const accountURL = await page.url();
    chaiExpect(accountURL).to.equal("https://practicesoftwaretesting.com/account");
  });

  test("user updates the profile", async ({ page }) => {
    const randomAppend = Date.now().toString().slice(-5);

    // And the User is on the Profile page
    await page.locator('[data-test="nav-profile"]').click();

    await page.waitForURL("https://practicesoftwaretesting.com/account/profile");
    const profileURL = page.url();
    chaiExpect(profileURL).to.equal("https://practicesoftwaretesting.com/account/profile");

    // When the User updates "Street" and "Postal code" fields with valid data
    const streetField = page.locator('[data-test="street"]');
    await page.waitForLoadState("networkidle");
    const streetValue = await streetField.inputValue();
    chaiExpect(streetValue).to.match(/.+/);

    const postalCodeField = await page.locator('[data-test="postal_code"]');
    const postalCodeValue = await postalCodeField.inputValue();
    chaiExpect(postalCodeValue).to.match(/.+/);

    // Adding new Street and Postal Code:
    await page.locator('[data-test="street"]').fill("Arcos " + `${randomAppend}`);
    await page.locator('[data-test="postal_code"]').fill(randomAppend);

    // And the User clicks the "Update profile" button
    await page.locator('[data-test="update-profile-submit"]').click();

    // Then the message "Your profile is successfully updated!" is displayed
    const profileUpdatedMsg = await page.getByText("Your profile is successfully updated!");
    await profileUpdatedMsg.waitFor({ state: "visible" });
    const updateMsgVisible = await profileUpdatedMsg.isVisible();
    chaiExpect(updateMsgVisible).to.be.true;
  });
});
