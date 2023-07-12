import { Tag } from '@/types/common';
import { Page, expect } from '@playwright/test';

export const applyFilterByTag = async (page: Page, tag: Tag) => {
  let selected = 0;

  await page.getByRole('button', { name: /Add filter/i }).click();

  await expect(page.getByRole('heading', { name: /Tags/i })).toBeVisible();

  await expect(
    page.getByRole('button', { name: /Select Tags/i }),
  ).toBeVisible();

  await page.getByRole('button', { name: /Select Tags/i }).click();

  await expect(page.getByText(`Tags (${selected})`)).toBeVisible();

  await expect(page.getByRole('checkbox', { name: tag.name })).toBeVisible();

  await page.getByRole('checkbox', { name: tag.name }).check();

  selected = 1;

  await expect(page.getByText(`Tags (${selected})`)).toBeVisible();

  await page.getByRole('button', { name: /Apply/i }).click();
};

export const applyFilterByCountry = async (
  page: Page,
  country: string,
  selected: number,
) => {
  await page.getByRole('button', { name: /Add filter/i }).click();

  await expect(page.getByRole('heading', { name: /Location/i })).toBeVisible();
  await expect(
    page.getByRole('button', { name: /Add country/i }),
  ).toBeVisible();

  await page.getByRole('button', { name: /Add country/i }).click();

  await expect(page.getByText(`Country (${selected})`)).toBeVisible();

  await page.getByPlaceholder(/Add country name, press enter/i).fill(country);

  await page.keyboard.press('Enter');

  selected = 1;

  await expect(page.getByText(`Country (${selected})`)).toBeVisible();

  await page.getByRole('button', { name: /Apply/i }).click();
};

export const applyFilterByState = async (
  page: Page,
  state: string,
  selected: number,
) => {
  await page.getByRole('button', { name: /Add filter/i }).click();

  await expect(page.getByRole('heading', { name: /Location/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Add state/i })).toBeVisible();

  await page.getByRole('button', { name: /Add state/i }).click();

  await expect(page.getByText(`State (${selected})`)).toBeVisible();

  await page.getByPlaceholder(/Add state name, press enter/i).fill(state);

  await page.keyboard.press('Enter');

  selected = 1;

  await expect(page.getByText(`State (${selected})`)).toBeVisible();

  await page.getByRole('button', { name: /Apply/i }).click();
};

export const applyFilterByCity = async (
  page: Page,
  city: string,
  selected: number,
) => {
  await page.getByRole('button', { name: /Add filter/i }).click();

  await expect(page.locator('h3', { hasText: /Location/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Add city/i })).toBeVisible();

  await page.getByRole('button', { name: /Add city/i }).click();

  await expect(page.getByText(`City (${selected})`)).toBeVisible();

  await page.getByPlaceholder(/Add city name, press enter/i).fill(city);

  await page.keyboard.press('Enter');

  selected = 1;

  await expect(page.getByText(`City (${selected})`)).toBeVisible();

  await page.getByRole('button', { name: /Apply/i }).click();
};

export const applyFilterBySize = async (page: Page, size: string) => {
  await page.getByRole('button', { name: /Add filter/i }).click();

  await expect(
    page.getByRole('heading', { name: /Event types/i }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: /Select size/i }),
  ).toBeVisible();

  await page.getByRole('button', { name: /Select size/i }).click();

  await page
    .locator('button', { has: page.getByRole('img', { name: 'Selector' }) })
    .click();

  await expect(page.locator('li > div', { hasText: size })).toBeVisible();

  await page.locator('li > div', { hasText: size }).click();

  await expect(page.locator('span', { hasText: size })).toBeVisible();

  await page.getByRole('button', { name: /Apply/i }).click();
};

export const applyFilterByEventType = async (page: Page, eventType: string) => {
  let selected = 0;

  await page.getByRole('button', { name: /Add filter/i }).click();

  await expect(page.getByText(/Event types/i)).toBeVisible();
  await expect(
    page.getByRole('button', { name: /Select type/i }),
  ).toBeVisible();

  await page.getByRole('button', { name: /Select type/i }).click();

  await expect(page.getByText(`Event type (${selected})`)).toBeVisible();

  await expect(page.getByRole('checkbox', { name: eventType })).toBeVisible();

  await page.getByRole('checkbox', { name: eventType }).check();

  selected = 1;

  await expect(page.getByText(`Event type (${selected})`)).toBeVisible();

  await page.getByRole('button', { name: /Apply/i }).click();
};
