import { expect, test } from '@playwright/test';
import {
  getInvalidLoginPayload,
  getLoginPayload,
  loginUser,
} from '../factories/auth';

test.describe('Login', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/`);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('should display an error message if input is empty', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.getByRole('textbox', { name: 'email' })).toBeEmpty();
    await expect(page.getByRole('textbox', { name: 'password' })).toBeEmpty();

    await page.getByRole('textbox', { name: 'email' }).fill(''); // Invalid email
    await page.getByRole('textbox', { name: 'password' }).fill(''); // Invalid password

    await page.getByRole('button', { name: /^Login$/i }).click();

    await expect(page.getByText(/Invalid password/i)).toBeVisible();
    await expect(page.getByText(/Enter valid email/i)).toBeVisible();
  });

  test('should not sign in user on wrong credentials', async ({ page }) => {
    const loginPayloadData = getInvalidLoginPayload();
    await loginUser(page, loginPayloadData);

    await expect(page.getByText(/Incorrect email or password./i)).toBeVisible();
  });

  test('should sign in user successfully', async ({ page }) => {
    const loginPayloadData = getLoginPayload();
    await loginUser(page, loginPayloadData);

    await expect(
      page
        .getByAltText('profile')
        .or(page.getByRole('img', { name: loginPayloadData.name })),
    ).toBeVisible();
  });
});
