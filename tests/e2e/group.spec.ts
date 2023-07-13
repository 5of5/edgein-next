import { getSavedUserPayload } from '../factories/auth';
import {
  createGroup,
  deleteGroup,
  getCreateGroupPayload,
} from '../factories/groups';
import {
  createList,
  deleteList,
  getCreateListPayload,
} from '../factories/lists';
import { test, expect } from '@playwright/test';
import { kebabCase } from '@/utils';

let groupToDelete: { name: string; id: number } | undefined;
let listToDelete: { name: string; id: number } | undefined;

test.describe('Group', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/profile/`);
  });

  test.afterEach(async ({ page, baseURL }) => {
    if (groupToDelete !== undefined) {
      await deleteGroup(page, baseURL, groupToDelete);

      groupToDelete = undefined;
    }

    if (listToDelete !== undefined) {
      await deleteList(page, baseURL, listToDelete);

      listToDelete = undefined;
    }

    await page.close();
  });

  test('should create a new group', async ({ page, baseURL }) => {
    const groupData = getCreateGroupPayload();

    const groupId = await createGroup(page, baseURL, groupData);

    await expect(
      page.getByRole('button', { name: `${groupData.name}`, exact: true }),
    ).toBeVisible();

    groupToDelete = {
      id: groupId,
      name: groupData.name,
    };
  });

  test('should delete a group', async ({ page, baseURL }) => {
    const groupData = getCreateGroupPayload();

    const groupId = await createGroup(page, baseURL, groupData);

    await deleteGroup(page, baseURL, { id: groupId, name: groupData.name });
  });

  test('should create a new public group', async ({ page, baseURL }) => {
    const groupData = getCreateGroupPayload();

    const groupId = await createGroup(page, baseURL, groupData);

    await page
      .getByRole('button', { name: `${groupData.name}`, exact: true })
      .click();

    await expect(
      page.locator('h2', {
        has: page.locator('div', {
          hasText: new RegExp(`${groupData.name}`, 'i'),
        }),
      }),
    ).toBeVisible();

    await page.getByRole('tab', { name: /Settings/i }).click();

    await expect(page.locator('p', { hasText: /Group Name/i })).toBeVisible();
    await expect(page.locator('p', { hasText: /Description/i })).toBeVisible();

    await expect(
      page.locator('button', {
        has: page.locator('span', { hasText: /Set group public/i }),
      }),
    ).not.toBeChecked();

    await page
      .locator('button', {
        has: page.locator('span', { hasText: /Set group public/i }),
      })
      .click();

    await expect(
      page.locator('button', {
        has: page.locator('span', { hasText: /Set group public/i }),
      }),
    ).toBeChecked();

    groupToDelete = {
      id: groupId,
      name: groupData.name,
    };
  });

  test('should add user to a group', async ({ page, baseURL }) => {
    const groupData = getCreateGroupPayload();

    const userData = getSavedUserPayload();

    const groupId = await createGroup(page, baseURL, groupData);

    await expect(
      page.getByRole('button', { name: `${groupData.name}`, exact: true }),
    ).toBeVisible();

    await page
      .locator('button', { has: page.locator('span', { hasText: /Invite/i }) })
      .click();

    await expect(
      page.getByRole('heading', { name: /Invite people to group:/i }),
    ).toBeVisible();

    await page
      .getByPlaceholder('e.g: Ashley or ashley@edgein.io')
      .type(userData.email, { delay: 100 });

    await expect(
      page.locator('li', {
        has: page.locator('div', { hasText: userData.email }),
      }),
    ).toBeVisible();

    await page
      .locator('li', { has: page.locator('div', { hasText: userData.email }) })
      .click();

    await expect(
      page.locator('li', {
        has: page.locator('div', { hasText: new RegExp(userData.name, 'i') }),
      }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Invite/i }).click();

    await expect(
      page.getByRole('heading', { name: /Invitation details/i }),
    ).toBeVisible();
    await expect(
      page.getByText(
        new RegExp(
          `Invitation has been sent to ${userData.email} successfully`,
          'i',
        ),
      ),
    ).toBeVisible();

    await page
      .locator('button', { has: page.getByRole('img', { name: 'Close' }) })
      .click();

    await page
      .getByRole('button', { name: `${groupData.name}`, exact: true })
      .click();

    await expect(
      page.locator('h2', {
        has: page.locator('div', {
          hasText: new RegExp(`${groupData.name}`, 'i'),
        }),
      }),
    ).toBeVisible();

    await page.getByRole('tab', { name: /Members/i }).click();

    await expect(
      page.locator('a', {
        has: page.locator('div', {
          has: page.locator('p', {
            hasText: new RegExp(userData.name, 'i'),
          }),
        }),
      }),
    ).toBeVisible();

    groupToDelete = {
      id: groupId,
      name: groupData.name,
    };
  });

  test('should add list to group', async ({ page, baseURL }) => {
    const groupData = getCreateGroupPayload();

    const listData = getCreateListPayload();

    // Create new list
    const listId = await createList(page, baseURL, listData);

    const slug = kebabCase(listData.name);

    await expect(page).toHaveURL(`${baseURL}/lists/${listId}/${slug}/`);

    await expect(
      page.locator('button', {
        has: page.locator('div', {
          hasText: new RegExp(`${listData.name}`, 'i'),
        }),
      }),
    ).toBeVisible();

    listToDelete = {
      id: listId,
      name: listData.name,
    };

    await page.goto(`${baseURL}/profile/`);

    // Create new group
    const groupId = await createGroup(page, baseURL, groupData);

    await expect(
      page.getByRole('button', { name: `${groupData.name}`, exact: true }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Add List/i }).click();

    await expect(
      page.getByRole('heading', { name: /Add List/i }),
    ).toBeVisible();

    await page
      .locator('button', { has: page.getByRole('img', { name: /Selector/i }) })
      .click();

    await expect(
      page.locator('li', {
        has: page.locator('div', { hasText: listData.name }),
      }),
    ).toBeVisible();

    await page
      .locator('li', { has: page.locator('div', { hasText: listData.name }) })
      .click();

    await expect(
      page.locator('button', {
        has: page.locator('div', { hasText: new RegExp(listData.name, 'i') }),
      }),
    ).toBeVisible();

    await page
      .locator('button', {
        has: page.locator('div', { hasText: new RegExp(listData.name, 'i') }),
      })
      .click();

    await page.getByRole('button', { name: /Save/i }).click();

    await expect(
      page.getByRole('heading', {
        name: new RegExp(listData.name, ''),
      }),
    ).toBeVisible();

    groupToDelete = {
      id: groupId,
      name: groupData.name,
    };
  });
});
