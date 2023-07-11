import { Page, expect } from '@playwright/test';
import { uniqueId } from '@/tests/utils';

interface GroupInfo {
  id?: number;
  name: string;
  description?: string;
}

export const getCreateGroupPayload = () => {
  return {
    name: `Edgein wizards ${uniqueId()}`,
    description:
      'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  };
};

export const createGroup = async (
  page: Page,
  baseURL: string | undefined,
  groupInfo: GroupInfo,
): Promise<number> => {
  await page
    .locator('li', {
      has: page.getByRole('button', { name: /Create Group/i }),
    })
    .click();

  await expect(
    page.getByRole('heading', { name: /Create Group/i }),
  ).toBeVisible();

  await expect(page.getByRole('textbox', { name: 'name' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'description' })).toBeEmpty();

  await page.getByRole('textbox', { name: 'name' }).fill(groupInfo.name);
  await page
    .getByRole('textbox', { name: 'description' })
    .fill(groupInfo.description || '');

  await page.getByRole('button', { name: /^Create$/i }).click();

  const response = await page.waitForResponse(`${baseURL}/api/groups/`);
  const { id } = await response.json();

  return id;
};

export const deleteGroup = async (
  page: Page,
  baseURL: string | undefined,
  groupInfo: GroupInfo,
) => {
  await page.goto(`${baseURL}/groups/${groupInfo.id}`, {
    timeout: 15000,
  });

  await page
    .getByRole('button', { name: `${groupInfo.name}`, exact: true })
    .click();

  await expect(
    page.locator('h2', {
      has: page.locator('div', {
        hasText: new RegExp(`${groupInfo.name}`, 'i'),
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
    page.locator('span', {
      hasText: new RegExp(`${groupInfo.name}`, 'i'),
    }),
  ).not.toBeVisible({ timeout: 15000 });
};
