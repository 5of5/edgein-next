import { Page, expect } from '@playwright/test';
import { random } from 'lodash';

interface GroupInfo {
  id: number;
  name: string;
}

export const getCreateGroupPayload = () => {
  const uniqueId = random(1, 800);

  return {
    name: `Edgein wizards ${uniqueId}`,
    description:
      'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  };
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
