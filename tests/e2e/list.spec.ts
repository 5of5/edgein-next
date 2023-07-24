import {
  createList,
  deleteList,
  getCreateListPayload,
} from '../factories/lists';
import { test, expect } from '@playwright/test';

let listToDelete: { name: string; id: number } | undefined;

test.describe('Lists', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/profile/`);
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

    await expect(page).toHaveURL(`${baseURL}/lists/`);

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
    const listId = await createList(page, baseURL, listData);

    listToDelete = {
      id: listId,
      name: listData.name,
    };
  });

  test('should delete a new list', async ({ page, baseURL }) => {
    const listData = getCreateListPayload();
    const listId = await createList(page, baseURL, listData);

    await deleteList(page, baseURL, { id: listId, name: listData.name });
  });

  test('should add companies to list', async ({ page, baseURL }) => {
    // Create new list
    const listData = getCreateListPayload();
    const listId = await createList(page, baseURL, listData);

    // Add companies
    await page.goto(`${baseURL}/companies/`);

    await expect(
      page.getByRole('heading', { name: /Web3 Companies/i }),
    ).toBeVisible();

    const companyLink = await page
      .getByTestId('companies')
      .getByRole('link')
      .first();

    const companyName = await companyLink.locator('h3').textContent();

    await companyLink.getByRole('button', { name: /Save/i }).click();

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

    await page.getByAltText('profile').first().click();

    await page.getByRole('menuitem', { name: /My Lists/ }).click();

    await page.getByTitle(new RegExp(`${listData.name}`, 'i')).click();

    await expect(
      page.locator('a', {
        has: page.locator('p', { hasText: `${companyName}` }),
      }),
    ).toBeVisible();

    listToDelete = {
      id: listId,
      name: listData.name,
    };
  });
});
