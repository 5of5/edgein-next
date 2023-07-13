import { Page, expect } from '@playwright/test';
import { uniqueId } from '@/tests/utils';
import { kebabCase } from '@/utils';

interface ListInfo {
  id?: number;
  name: string;
}

export const getCreateListPayload = () => {
  return {
    name: `List ${uniqueId()}`,
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

  const slug = kebabCase(listInfo.name);
  await expect(page).toHaveURL(`${baseURL}/lists/${listId}/${slug}/`);
  await expect(
    page.locator('button', {
      has: page.locator('div', {
        hasText: new RegExp(`${listInfo.name}`, 'i'),
      }),
    }),
  ).toBeVisible();

  return listId;
};

export const deleteList = async (
  page: Page,
  baseURL: string | undefined,
  listInfo: ListInfo,
) => {
  const slug = kebabCase(listInfo.name);

  await page.goto(`${baseURL}/lists/${listInfo.id}/${slug}/`);

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

  await expect(page).toHaveURL(`${baseURL}/lists/`);

  await expect(
    page.locator('button', {
      has: page.locator('div', {
        hasText: new RegExp(`${listInfo.name}`, 'i'),
      }),
    }),
  ).not.toBeVisible();
};
