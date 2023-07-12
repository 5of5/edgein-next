import { Page, expect } from '@playwright/test';
import { random, toLower } from 'lodash';

interface ListInfo {
  id?: number;
  name: string;
}

export const getCreateListPayload = () => {
  const uniqueId = random(1, 800);

  return {
    name: `List ${uniqueId}`,
  };
};

export const createList = async (
  page: Page,
  baseURL: string | undefined,
  listInfo: ListInfo,
): Promise<number> => {
  await page
    .locator('li', {
      has: page.locator('button', { hasText: /Create new list/i }),
    })
    .click();

  await expect(
    page.getByRole('heading', { name: /Create List/i }),
  ).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'name' })).toBeEmpty();

  await page.getByRole('textbox', { name: 'name' }).fill(listInfo.name);

  await page.getByRole('button', { name: /^Create$/i }).click();

  const createListResponse = await page.waitForResponse(
    `${baseURL}/api/add-list/`,
  );
  const {
    list: { id: listId },
  } = await createListResponse.json();

  return listId;
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