import { expect, test } from '@playwright/test';
import { getDuplicateSignUpPayload, getSignUpPayload } from '../factories/auth';

test.describe('Sign up', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/`, { timeout: 15000 });

    await page.getByRole('button', { name: 'Sign Up' }).click();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('should display an error message when an invalid email is used', async ({
    page,
  }) => {
    const signupPayloadData = getSignUpPayload();

    await page
      .getByRole('textbox', { name: 'email' })
      .fill('john-doe@gmail.com'); // Invalid work email
    await expect(page.getByText(/Please enter a work email./i)).toBeVisible();

    await page.getByRole('textbox', { name: 'email' }).clear();

    await page.getByRole('textbox', { name: 'email' }).fill('invalid.email'); // Invalid email
    await expect(
      page.getByText(/Please enter valid work email./i),
    ).toBeVisible();

    await page
      .getByRole('textbox', { name: 'email' })
      .fill(signupPayloadData.email); // Valid email
    await expect(
      page.getByText(
        /(Please enter a work email. | Please enter valid work email.)/i,
      ),
    ).not.toBeVisible();
  });

  test('should display an error message when the inputted password is invalid', async ({
    page,
  }) => {
    const signupPayloadData = getSignUpPayload();

    await page.getByRole('textbox', { name: 'password' }).fill('password'); // Invalid password
    await expect(
      page.getByText(
        /Password should have least 8 characters including a lower-case letter, an upper-case letter, a number, and a special character/i,
      ),
    ).toBeVisible();

    await page.getByRole('textbox', { name: 'password' }).clear();

    await page
      .getByRole('textbox', { name: 'password' })
      .fill(signupPayloadData.password); // Valid password
    await expect(
      page.getByText(
        /Password should have least 8 characters including a lower-case letter, an upper-case letter, a number, and a special character/i,
      ),
    ).not.toBeVisible();
  });

  test('should allow user register successfully', async ({ page }) => {
    const signupPayloadData = getSignUpPayload();

    await page
      .getByRole('textbox', { name: 'name' })
      .fill(signupPayloadData.name);
    await page
      .getByRole('textbox', { name: 'email' })
      .fill(signupPayloadData.email);
    await page
      .getByRole('textbox', { name: 'password' })
      .fill(signupPayloadData.password);

    await page
      .getByRole('button', { name: /Sign up\s+(with referral|and explore)$/i })
      .click();

    await expect(
      page.getByRole('heading', { name: 'Registration Complete' }),
    ).toBeVisible({ timeout: 15000 });
  });

  test('should not allow an already registered email', async ({ page }) => {
    const duplicateSignupPayloadData = getDuplicateSignUpPayload();

    await page
      .getByRole('textbox', { name: 'name' })
      .fill(duplicateSignupPayloadData.name);
    await page
      .getByRole('textbox', { name: 'email' })
      .fill(duplicateSignupPayloadData.email);
    await page
      .getByRole('textbox', { name: 'password' })
      .fill(duplicateSignupPayloadData.password);

    await page
      .getByRole('button', { name: /Sign up\s+(with referral|and explore)$/i })
      .click();

    await expect(
      page.getByText(
        new RegExp(
          `Email ${duplicateSignupPayloadData.email} already registered, please try signing in`,
          'i',
        ),
      ),
    ).toBeVisible();
  });
});