import { test as setup, expect } from '@playwright/test';
import { getLoginPayload } from './factories/auth';

const URL = 'http://localhost:3000/';

const file = 'playwright/.auth/user.json';

setup('Authenticate', async ({ page }) => {
  const loginPayloadData = getLoginPayload();

  await page.goto(URL);

  await page.getByRole('button', { name: 'Log In' }).click();

  await page
    .getByRole('textbox', { name: 'email' })
    .fill(loginPayloadData.email);
  await page
    .getByRole('textbox', { name: 'password' })
    .fill(loginPayloadData.password);

  await page.getByRole('button', { name: /^Login$/i }).click();

  await expect(page.getByAltText('profile')).toBeVisible({ timeout: 15000 });

  await page.context().storageState({ path: file });
});
