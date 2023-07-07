import { Page, expect } from '@playwright/test';
import { random, toLower } from 'lodash';

interface ListInfo {
  id: number;
  name: string;
}

export const getCreateListPayload = () => {
  const uniqueId = random(1, 800);

  return {
    name: `List ${uniqueId}`,
  };
};

export const deleteList = async (
  page: Page,
  baseURL: string | undefined,
  listInfo: ListInfo,
) => {
  const slug = toLower(listInfo.name).replace(/\s/, '-');

  await page.goto(`${baseURL}/lists/${listInfo.id}/${slug}/`, {
    timeout: 15000,
  });

  await page
    .locator('button', {
      has: page.locator('div', {
        hasText: new RegExp(`${listInfo.name}`, 'i'),
      }),
    })
    .click();

  await page
    .locator('button', {
      has: page.locator('h3', { hasText: /Delete List/i }),
    })
    .click();

  await expect(
    page.getByRole('heading', { name: /Delete this list/i }),
  ).toBeVisible();

  await page.getByRole('button', { name: /Delete/i }).click();

  await expect(page).toHaveURL(`${baseURL}/lists/0/hot/`);

  await expect(
    page.locator('button', {
      has: page.locator('div', {
        hasText: new RegExp(`${listInfo.name}`, 'i'),
      }),
    }),
  ).not.toBeVisible({ timeout: 15000 });
};
