import { test, expect } from '@playwright/test';
import { getSelectableWeb3Tags } from '@/utils/helpers';

test.describe('Companies', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/`);

    await page.getByRole('link', { name: /Companies/ }).click();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('should filter by tags', async ({ page }) => {
    const EXPECTED_COMPANIES_FILTERED_BY_TAG = 23;

    let selected = 0;

    const tags = getSelectableWeb3Tags();

    await page.getByRole('button', { name: /Add filter/i }).click();

    await expect(page.locator('h3', { hasText: /Tags/i })).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Select Tags/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Select Tags/i }).click();

    await expect(page.getByText(`Tags (${selected})`)).toBeVisible();

    await expect(
      page.getByRole('checkbox', { name: tags[0].name }),
    ).toBeVisible();

    await page.getByRole('checkbox', { name: tags[0].name }).check();

    selected = 1;

    await expect(page.getByText(`Tags (${selected})`)).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('companies').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_TAG,
    );
  });

  test('should filter by location', async ({ page }) => {
    const EXPECTED_COMPANIES_FILTERED_BY_COUNTRY = 3;

    const EXPECTED_COMPANIES_FILTERED_BY_STATE = 20;

    const EXPECTED_COMPANIES_FILTERED_BY_CITY = 1;

    let selected = 0;

    await page.getByRole('button', { name: /Add filter/i }).click();

    // country e.g India
    await expect(page.locator('h3', { hasText: /Location/i })).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Add country/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Add country/i }).click();

    await expect(page.getByText(`Country (${selected})`)).toBeVisible();

    await page.getByPlaceholder(/Add country name, press enter/i).fill('India');

    await page.keyboard.press('Enter');

    selected = 1;

    await expect(page.getByText(`Country (${selected})`)).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('companies').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_COUNTRY,
    );

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // state e.g California
    await page.getByRole('button', { name: /Add filter/i }).click();

    await expect(page.locator('h3', { hasText: /Location/i })).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Add state/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Add state/i }).click();

    await expect(page.getByText(`State (${selected})`)).toBeVisible();

    await page
      .getByPlaceholder(/Add state name, press enter/i)
      .fill('California');

    await page.keyboard.press('Enter');

    selected = 1;

    await expect(page.getByText(`State (${selected})`)).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('companies').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_STATE,
    );

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // city e.g Berlin
    await page.getByRole('button', { name: /Add filter/i }).click();

    await expect(page.locator('h3', { hasText: /Location/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Add city/i })).toBeVisible();

    await page.getByRole('button', { name: /Add city/i }).click();

    await expect(page.getByText(`City (${selected})`)).toBeVisible();

    await page.getByPlaceholder(/Add city name, press enter/i).fill('Berlin');

    await page.keyboard.press('Enter');

    selected = 1;

    await expect(page.getByText(`City (${selected})`)).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('companies').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_CITY,
    );
  });
});
