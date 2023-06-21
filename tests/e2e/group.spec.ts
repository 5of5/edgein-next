import { toLower } from 'lodash';
import { getSavedUserPayload } from '../factories/auth';
import { getCreateGroupPayload } from '../factories/groups';
import { getCreateListPayload } from '../factories/lists';
import { test, expect } from '@playwright/test';

test.describe('Group', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/profile/`, { timeout: 15000 });
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('should create a new group', async ({ page, baseURL }) => {
    const groupData = getCreateGroupPayload();

    await page
      .locator('li', {
        has: page.getByRole('button', { name: /Create Group/i }),
      })
      .click();

    await expect(
      page.getByRole('heading', { name: /Create Group/i }),
    ).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'name' })).toBeEmpty();
    await expect(
      page.getByRole('textbox', { name: 'description' }),
    ).toBeEmpty();

    await page.getByRole('textbox', { name: 'name' }).fill(groupData.name);
    await page
      .getByRole('textbox', { name: 'description' })
      .fill(groupData.description);

    await page.getByRole('button', { name: /^Create$/i }).click();

    const response = await page.waitForResponse(`${baseURL}/api/groups/`);
    const { id } = await response.json();

    await expect(page).toHaveURL(`${baseURL}/groups/${id}/`, {
      timeout: 15000,
    });
    await expect(
      page.locator('button', {
        has: page.locator('span', {
          hasText: new RegExp(`${groupData.name}`, 'i'),
        }),
      }),
    ).toBeVisible();
  });

  test('should delete a group', async ({ page, baseURL }) => {
    const groupData = getCreateGroupPayload();

    await page
      .locator('li', {
        has: page.getByRole('button', { name: /Create Group/i }),
      })
      .click();

    await expect(
      page.getByRole('heading', { name: /Create Group/i }),
    ).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'name' })).toBeEmpty();
    await expect(
      page.getByRole('textbox', { name: 'description' }),
    ).toBeEmpty();

    await page.getByRole('textbox', { name: 'name' }).fill(groupData.name);
    await page
      .getByRole('textbox', { name: 'description' })
      .fill(groupData.description);

    await page.getByRole('button', { name: /^Create$/i }).click();

    const response = await page.waitForResponse(`${baseURL}/api/groups/`);
    const { id } = await response.json();

    await expect(page).toHaveURL(`${baseURL}/groups/${id}/`, {
      timeout: 15000,
    });

    await page
      .locator('button', {
        has: page.locator('span', {
          hasText: new RegExp(`${groupData.name}`, 'i'),
        }),
      })
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

    await page.locator('p', { hasText: /Delete Group/i }).click();

    await expect(
      page.getByRole('heading', { name: /Delete This Group/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Delete/i }).click();

    await expect(page).toHaveURL(`${baseURL}/account/`);

    await expect(
      page.locator('span', { hasText: new RegExp(`${groupData.name}`, 'i') }),
    ).not.toBeVisible();
  });

  test('should create a new public group', async ({ page, baseURL }) => {
    const groupData = getCreateGroupPayload();

    await page
      .locator('li', {
        has: page.getByRole('button', { name: /Create Group/i }),
      })
      .click();

    await expect(
      page.getByRole('heading', { name: /Create Group/i }),
    ).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'name' })).toBeEmpty();
    await expect(
      page.getByRole('textbox', { name: 'description' }),
    ).toBeEmpty();

    await page.getByRole('textbox', { name: 'name' }).fill(groupData.name);
    await page
      .getByRole('textbox', { name: 'description' })
      .fill(groupData.description);

    await page.getByRole('button', { name: /^Create$/i }).click();

    const response = await page.waitForResponse(`${baseURL}/api/groups/`);
    const { id } = await response.json();

    await expect(page).toHaveURL(`${baseURL}/groups/${id}/`, {
      timeout: 15000,
    });

    await page
      .locator('button', {
        has: page.locator('span', {
          hasText: new RegExp(`${groupData.name}`, 'i'),
        }),
      })
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
        has: page.locator('span', { hasText: /Set group public/ }),
      }),
    ).not.toBeChecked();

    await page
      .locator('button', {
        has: page.locator('span', { hasText: /Set group public/ }),
      })
      .click();

    await expect(
      page.locator('button', {
        has: page.locator('span', { hasText: /Set group public/ }),
      }),
    ).toBeChecked();
  });

  test('should add user to a group', async ({ page, baseURL }) => {
    const groupData = getCreateGroupPayload();

    const userData = getSavedUserPayload();

    await page
      .locator('li', {
        has: page.getByRole('button', { name: /Create Group/i }),
      })
      .click();

    await expect(
      page.getByRole('heading', { name: /Create Group/i }),
    ).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'name' })).toBeEmpty();
    await expect(
      page.getByRole('textbox', { name: 'description' }),
    ).toBeEmpty();

    await page.getByRole('textbox', { name: 'name' }).fill(groupData.name);
    await page
      .getByRole('textbox', { name: 'description' })
      .fill(groupData.description);

    await page.getByRole('button', { name: /^Create$/i }).click();

    const response = await page.waitForResponse(`${baseURL}/api/groups/`);
    const { id } = await response.json();

    await expect(page).toHaveURL(`${baseURL}/groups/${id}/`, {
      timeout: 15000,
    });

    await expect(
      page.locator('button', {
        has: page.locator('span', {
          hasText: new RegExp(`${groupData.name}`, 'i'),
        }),
      }),
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
      .locator('button', {
        has: page.locator('span', {
          hasText: new RegExp(`${groupData.name}`, 'i'),
        }),
      })
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
  });

  test('should add list to group', async ({ page, baseURL }) => {
    const groupData = getCreateGroupPayload();

    const listData = getCreateListPayload();

    // Create new list
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

    await expect(page).toHaveURL(`${baseURL}/lists/${listId}/${slug}/`, {
      timeout: 15000,
    });

    await expect(
      page.locator('button', {
        has: page.locator('div', {
          hasText: new RegExp(`${listData.name}`, 'i'),
        }),
      }),
    ).toBeVisible();

    await page.goto(`${baseURL}/profile/`);

    // Create new group
    await page
      .locator('li', {
        has: page.getByRole('button', { name: /Create Group/i }),
      })
      .click();

    await expect(
      page.getByRole('heading', { name: /Create Group/i }),
    ).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'name' })).toBeEmpty();
    await expect(
      page.getByRole('textbox', { name: 'description' }),
    ).toBeEmpty();

    await page.getByRole('textbox', { name: 'name' }).fill(groupData.name);
    await page
      .getByRole('textbox', { name: 'description' })
      .fill(groupData.description);

    await page.getByRole('button', { name: /^Create$/i }).click();

    const createGroupResponse = await page.waitForResponse(
      `${baseURL}/api/groups/`,
    );
    const { id: groupId } = await createGroupResponse.json();

    await expect(page).toHaveURL(`${baseURL}/groups/${groupId}/`, {
      timeout: 15000,
    });

    await expect(
      page.locator('button', {
        has: page.locator('span', {
          hasText: new RegExp(`${groupData.name}`, 'i'),
        }),
      }),
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
  });
});
