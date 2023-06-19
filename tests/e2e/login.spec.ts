import { expect, test } from '@playwright/test';
import { getInvalidLoginPayload, getLoginPayload } from '../factories/auth';

test.describe('Login', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}`);

    await page.getByRole('button', { name: 'Log In' }).click();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('should display an error message if input is empty', async ({
    page,
  }) => {
    await expect(page.getByRole('textbox', { name: 'email' })).toBeEmpty();
    await expect(page.getByRole('textbox', { name: 'password' })).toBeEmpty();

    await page.getByRole('textbox', { name: 'email' }).fill(''); // Invalid email
    await page.getByRole('textbox', { name: 'password' }).fill(''); // Invalid password

    await page.getByRole('button', { name: /^Login$/i }).click();

    await expect(page.getByText(/Invalid password/i)).toBeVisible();
    await expect(page.getByText(/Enter valid email/i)).toBeVisible();
  });

  test('should not sign in user on wrong credentials', async ({ page }) => {
    const data = getInvalidLoginPayload();

    await page.getByRole('textbox', { name: 'email' }).fill(data.email);
    await page.getByRole('textbox', { name: 'password' }).fill(data.password);

    await page.getByRole('button', { name: /^Login$/i }).click();

    await expect(page.getByText(/Incorrect email or password./i)).toBeVisible();
  });

  test('should sign in user successfully', async ({ page, baseURL }) => {
    const data = getLoginPayload();

    await page.getByRole('textbox', { name: 'email' }).fill(data.email);
    await page.getByRole('textbox', { name: 'password' }).fill(data.password);

    await page.getByRole('button', { name: /^Login$/i }).click();

    await page.waitForURL(`${baseURL}`);

    await page.waitForLoadState('domcontentloaded');

    await page.waitForTimeout(3000);

    await expect(page.getByAltText('profile')).toBeVisible();
  });
});
