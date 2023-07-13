import { expect, test as setup } from '@playwright/test';
import { getLoginPayload, loginUser } from './factories/auth';

const URL = 'http://localhost:3000/';

const file = 'playwright/.auth/user.json';

setup('Authenticate', async ({ page }) => {
  await page.goto(URL);

  const loginPayloadData = getLoginPayload();
  await loginUser(page, loginPayloadData);

  await expect(
    page
      .getByAltText('profile')
      .or(page.getByRole('img', { name: loginPayloadData.name })),
  ).toBeVisible();

  await page.context().storageState({ path: file });
});
