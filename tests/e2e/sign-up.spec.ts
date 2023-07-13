import { expect, test } from '@playwright/test';
import {
  getDuplicateSignUpPayload,
  getSignUpPayload,
  signupUser,
} from '../factories/auth';

test.describe('Sign up', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/`);

    await page
      .getByRole('button', { name: 'Start for free', exact: true })
      .click();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('should display an error message when an invalid email is used', async ({
    page,
  }) => {
    const signupPayloadData = getSignUpPayload();

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
    await signupUser(page, getSignUpPayload());

    await expect(
      page.getByRole('heading', { name: 'Registration Complete' }),
    ).toBeVisible();
  });

  test('should not allow an already registered email', async ({ page }) => {
    const duplicateSignupPayloadData = getDuplicateSignUpPayload();
    await signupUser(page, duplicateSignupPayloadData);

    await expect(
      page.getByText(new RegExp(`The user already exists`, 'i')),
    ).toBeVisible();
  });
});
