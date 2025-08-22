import { test, expect } from "@playwright/test";

test.describe("user profile", () => {
  test("user updates the profile", async ({ page }) => {
    const randomAppend = Date.now().toString().slice(-5);

    // Given the User is logged
    await page.goto("/auth/login");
    await page.locator('[data-test="email"]').fill("email@example.com");
    await page.locator('[data-test="password"]').fill("123_Tests");
    await page.locator('[data-test="login-submit"]').click();
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/account");

    // And the User is on the Profile page
    await page.locator('[data-test="nav-profile"]').click();
    await expect(page).toHaveURL(
      "https://practicesoftwaretesting.com/account/profile"
    );

    // When the User updates "Street" and "Postal code" fields with valid data
    await expect(page.locator('[data-test="street"]')).toHaveValue(/.+/);
    await expect(page.locator('[data-test="postal_code"]')).toHaveValue(/.+/);
    await page
      .locator('[data-test="street"]')
      .fill("Arcos " + `${randomAppend}`);
    await page.locator('[data-test="postal_code"]').fill(randomAppend);

    // And the User clicks the "Update profile" button
    await page.locator('[data-test="update-profile-submit"]').click();

    // Then the message "Your profile is successfully updated!" is displayed
    await expect(
      page.getByText("Your profile is successfully updated!")
    ).toBeVisible();
  });

  //   test('user changes password', async ({ page }) => {
  //     const randomPasswordAppend = Date.now().toString().slice(-5);

  //     // When the User enters the current password correctly
  //     // And enters and confirms a new valid password
  //     // Then the message "Your password is successfully updated!" is displayed
  //     // And the User gets redirected to the login page

  //     // Given the User is logged
  //     await page.goto('/auth/login');
  //     await page.locator('[data-test="email"]').fill('email@example.com');
  //     await page.locator('[data-test="password"]').fill('123_Tests');
  //     await page.locator('[data-test="login-submit"]').click();
  //     await page.waitForURL('https://practicesoftwaretesting.com/account', { timeout: 10000 });

  //     // And the User is on the Profile page
  //     await page.locator('[data-test="nav-profile"]').click();
  //     await page.waitForURL('https://practicesoftwaretesting.com/account/profile', { timeout: 10000 });

  //     // // 3) Fill password form (blur fields to trigger validation)
  //     // await expect(page.locator('[data-test="current-password"]')).toBeEnabled();
  //     // await page.locator('[data-test="current-password"]').fill('123_Tests');
  //     // await page.locator('[data-test="current-password"]').press('Tab');

  //     // await expect(page.locator('[data-test="new-password"]')).toBeEnabled();
  //     // await page.locator('[data-test="new-password"]').fill('1234_Tests');
  //     // await page.locator('[data-test="new-password"]').press('Tab');

  //     // await expect(page.locator('[data-test="new-password-confirm"]')).toBeEnabled();
  //     // await page.locator('[data-test="new-password-confirm"]').fill('1234_Tests');
  //     // await page.locator('[data-test="new-password-confirm"]').press('Tab');

  //     await expect(page.locator('[data-test="change-password-submit"]')).toBeVisible();
  //     await expect(page.locator('[data-test="change-password-submit"]')).toBeEnabled();

  //     // // 4) Wait for the backend response, then click (or click then wait — here we wait for response after click)

  // const [request] = await Promise.all([
  //     page.waitForRequest(req => req.url().includes('https://api.practicesoftwaretesting.com/users/change-password')),
  //     page.locator('[data-test="change-password-submit"]').click()
  // ]);
  // expect(request.method()).toBe('POST');

  //     // // Start waiting for response before clicking. Note no await.
  //     // const responsePromise = page.waitForResponse('https://api.practicesoftwaretesting.com/users/change-password');
  //     // await page.locator('[data-test="change-password-submit"]').click();
  //     // const response = await responsePromise;
  //     // console.log(response);

  //     // // Alternative way with a predicate. Note no await.
  //     // const responsePromise = page.waitForResponse(response =>
  //     // response.url() === 'https://api.practicesoftwaretesting.com/users/change-password' && response.status() === 200
  //     //     && response.request().method() === 'GET'
  //     // );
  //     // await page.locator('[data-test="change-password-submit"]').click();
  //     // const response = await responsePromise;
  //     // console.log(response);

  //     // const btn = page.locator('[data-test="change-password-submit"]');
  //     // await btn.hover();
  //     // await btn.dispatchEvent('click'); // fires DOM click without mouse movement

  //     // page.on('request', request => {
  //     //   console.log('➡️', request.method(), request.url());
  //     // });
  //     // page.on('response', response => {
  //     //   console.log('⬅️', response.status(), response.url());
  //     // });

  //     // await page.waitForTimeout(10000);
  //     // await page.waitForURL('https://practicesoftwaretesting.com/auth/login');

  //     // await Promise.all([
  //     //   page.waitForResponse(resp =>
  //     //     resp.url().includes('/users/change-password') &&
  //     //     resp.status() >= 200 && resp.status() < 300
  //     //   ),
  //     //   page.locator('[data-test="change-password-submit"]').click()
  //     // ]);

  //     // const responsePromise = page.waitForResponse(response =>
  //     //   response.url().includes('/users/change-password') && response.status() >= 200 && response.status() < 300
  //     // );
  //     // await page.locator('[data-test="change-password-submit"]').click();
  //     // const res = await responsePromise; // wait for backend success

  //     // Optional: helpful debug info (uncomment while debugging)
  //     // console.log('Change-password status:', res.status());
  //     // const body = await res.text();
  //     // console.log('Response body:', body);

  //     // 5) Try to assert the success toast. If the app already navigated away before the toast appears,
  //     //    fall back to waiting for the login URL.
  //     // try {
  //     //   await expect(page.getByText('Your password is successfully updated!')).toBeVisible({ timeout: 5000 });
  //     // } catch (err) {
  //     //   // If message never appears in time, try waiting for the redirect instead
  //     //   await page.waitForURL('https://practicesoftwaretesting.com/auth/login', { timeout: 10000 });
  //     //   // Optionally: you can still try to find the message on the landing page (if applicable)
  //     // }

  //     // 6) Final assert: ensure we ended up at the login page
  //     // await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login', { timeout: 10000 });

  //     // await page.locator('[data-test="email"]').fill('email@example.com');
  //     // await page.locator('[data-test="password"]').fill('123_Tests' + randomPasswordAppend);
  //     // await page.locator('[data-test="login-submit"]').click();
  //     // await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  //     // await page.locator('[data-test="nav-profile"]').click();
  //     // await expect(page).toHaveURL('https://practicesoftwaretesting.com/account/profile');
  //     // await page.locator('[data-test="current-password"]').fill('123_Tests' + randomPasswordAppend);
  //     // await page.locator('[data-test="new-password"]').fill('123_Tests');
  //     // await page.locator('[data-test="new-password-confirm"]').fill('123_Tests');
  //     // await page.locator('[data-test="change-password-submit"]').click();
  //     // await expect(page.getByText('Your password is successfully updated!')).toBeVisible();
  //   });
});
