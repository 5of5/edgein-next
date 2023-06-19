import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { getLoginPayload } from './factories/auth';

export * from '@playwright/test';

export const test = base.extend<{}, { workerStorageState: string }>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [
    async ({ browser }, use) => {
      const fileName = path.resolve(
        test.info().project.outputDir,
        `auth/user.json`,
      );

      if (fs.existsSync(fileName)) {
        await use(fileName);
        return;
      }

      const page = await browser.newPage({ storageState: undefined });

      const data = await getLoginPayload();

      await page.goto('http://localhost:3000/');

      await page.getByRole('button', { name: 'Log In' }).click();

      await page.getByRole('textbox', { name: 'email' }).fill(data.email);
      await page.getByRole('textbox', { name: 'password' }).fill(data.password);

      await page.getByRole('button', { name: /^Login$/i }).click();

      await page.waitForURL('http://localhost:3000');

      await page.waitForLoadState('domcontentloaded');

      await page.waitForTimeout(1000);

      await expect(page.getByAltText('profile')).toBeVisible();

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: 'worker' },
  ],
});
