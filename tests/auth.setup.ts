import { test as setup } from '@playwright/test';
import { getLoginPayload, loginUser } from './factories/auth';

const URL = 'http://localhost:3000/';

const file = 'playwright/.auth/user.json';

setup('Authenticate', async ({ page }) => {
  await page.goto(URL);

  await loginUser(page, getLoginPayload());

  await page.context().storageState({ path: file });
});
