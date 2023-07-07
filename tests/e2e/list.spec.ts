import { toLower } from 'lodash';
import { deleteList, getCreateListPayload } from '../factories/lists';
import { test, expect } from '@playwright/test';

let listToDelete: { name: string; id: number } | undefined;

test.describe('Lists', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/profile/`, { timeout: 15000 });
  });

  test.afterEach(async ({ page, baseURL }) => {
    if (listToDelete !== undefined) {
      await deleteList(page, baseURL, listToDelete);

      listToDelete = undefined;
    }

    await page.close();
  });

  test('should have a default lists', async ({ page, baseURL }) => {
    await page
      .getByRole('navigation', { name: 'Global' })
      .getByRole('img', { name: 'profile' })
      .click();

    await page.getByRole('menuitem', { name: /My Lists/ }).click();

    await expect(page).toHaveURL(`${baseURL}/lists/0/hot/`);

    await page
      .locator('li', {
        has: page.locator('a', {
          has: page.locator('span', { hasText: 'Like' }),
        }),
      })
      .click();

    await expect(page).toHaveURL(`${baseURL}/lists/0/like/`);

    await page
      .locator('li', {
        has: page.locator('a', {
          has: page.locator('span', { hasText: 'Sh**' }),
        }),
      })
      .click();

    await expect(page).toHaveURL(`${baseURL}/lists/0/sh**/`);
  });

  test('should display an error message if list name is invalid', async ({
    page,
  }) => {
    await page
      .locator('li', {
        has: page.locator('button', { hasText: /Create new list/i }),
      })
      .click();

    await expect(
      page.getByRole('heading', { name: /Create List/i }),
    ).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'name' })).toBeEmpty();

    await page.getByRole('textbox', { name: 'name' }).fill('Fi');

    await expect(
      page.getByText(/List name should have at least 3 characters./i),
    ).toBeVisible();

    await page.getByRole('textbox', { name: 'name' }).clear();

    await expect(
      page.getByText(/List name should have at least 3 characters./i),
    ).not.toBeVisible();
  });

  test('should create a new list', async ({ page, baseURL }) => {
    const listData = getCreateListPayload();

    await page
      .locator('li', {
        has: page.locator('button', { hasText: /Create new list/i }),
      })
      .click();

    await expect(
      page.getByRole('heading', { name: /Create List/i }),
    ).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'name' })).toBeEmpty();

    await page.getByRole('textbox', { name: 'name' }).fill(listData.name);

    await page.getByRole('button', { name: /^Create$/i }).click();

    const createListResponse = await page.waitForResponse(
      `${baseURL}/api/add-list/`,
    );
    const {
      list: { id: listId },
    } = await createListResponse.json();

    const slug = toLower(listData.name).replace(/\s/, '-');

    await expect(page).toHaveURL(`${baseURL}/lists/${listId}/${slug}/`);

    await expect(
      page.locator('button', {
        has: page.locator('div', {
          hasText: new RegExp(`${listData.name}`, 'i'),
        }),
      }),
    ).toBeVisible({ timeout: 15000 });

    listToDelete = {
      id: listId,
      name: listData.name,
    };
  });

  test('should delete a new list', async ({ page, baseURL }) => {
    const listData = getCreateListPayload();

    await page
      .locator('li', {
        has: page.locator('button', { hasText: /Create new list/i }),
      })
      .click();

    await expect(
      page.getByRole('heading', { name: /Create List/i }),
    ).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'name' })).toBeEmpty();

    await page.getByRole('textbox', { name: 'name' }).fill(listData.name);

    await page.getByRole('button', { name: /^Create$/i }).click();

    const response = await page.waitForResponse(`${baseURL}/api/add-list/`);
    const {
      list: { id },
    } = await response.json();

    await deleteList(page, baseURL, { id, name: listData.name });
  });

  test('should add companies to list', async ({ page, baseURL }) => {
    // Create new list
    const listData = getCreateListPayload();

    await page
      .locator('li', {
        has: page.locator('button', { hasText: /Create new list/i }),
      })
      .click();

    await expect(
      page.getByRole('heading', { name: /Create List/i }),
    ).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'name' })).toBeEmpty();

    await page.getByRole('textbox', { name: 'name' }).fill(listData.name);

    await page.getByRole('button', { name: /^Create$/i }).click();

    const createListResponse = await page.waitForResponse(
      `${baseURL}/api/add-list/`,
    );
    const {
      list: { id: listId },
    } = await createListResponse.json();

    const slug = toLower(listData.name).replace(/\s/, '-');

    await expect(page).toHaveURL(`${baseURL}/lists/${listId}/${slug}/`);

    await expect(
      page.locator('button', {
        has: page.locator('div', {
          hasText: new RegExp(`${listData.name}`, 'i'),
        }),
      }),
    ).toBeVisible();

    // Add companies
    await page.goto(`${baseURL}/companies/`, { timeout: 15000 });

    await expect(
      page.getByRole('heading', { name: /Web3 Companies/i }),
    ).toBeVisible({ timeout: 15000 });

    const a = await page.getByTestId('companies').getByRole('link').first();

    const companyName = await a.locator('h3').textContent();

    await a.getByRole('button', { name: /Save/i }).click();

    await expect(
      page.getByRole('heading', { name: /Save to List/i }),
    ).toBeVisible();

    await page
      .locator('label', {
        has: page.locator('span', {
          hasText: new RegExp(`${listData.name}`, 'i'),
        }),
      })
      .getByRole('checkbox')
      .click();

    await page
      .locator('button', { has: page.locator('span', { hasText: 'Close' }) })
      .click();

    await page.getByAltText('profile').click();

    await page.getByRole('menuitem', { name: /My Lists/ }).click();

    await page.getByTitle(new RegExp(`${listData.name}`, 'i')).click();

    await expect(
      page.locator('a', {
        has: page.locator('p', { hasText: `${companyName}` }),
      }),
    ).toBeVisible({ timeout: 15000 });

    listToDelete = {
      id: listId,
      name: listData.name,
    };
  });
});
