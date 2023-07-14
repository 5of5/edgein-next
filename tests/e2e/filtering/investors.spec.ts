import { test, expect } from '@playwright/test';
import { getSelectableWeb3Tags } from '@/utils/helpers';
import {
  applyFilterByCity,
  applyFilterByCountry,
  applyFilterByState,
  applyFilterByTag,
} from '@/tests/factories/filtering';

test.describe('Investors', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/`);

    await page.getByRole('link', { name: /Investors/ }).click();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('should filter by tags', async ({ page }) => {
    const EXPECTED_COMPANIES_FILTERED_BY_TAG = 50;

    const tags = getSelectableWeb3Tags();

    await applyFilterByTag(page, tags[0]);

    await expect(page.getByTestId('investors').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_TAG,
    );
  });

  test('should filter by location', async ({ page }) => {
    const EXPECTED_COMPANIES_FILTERED_BY_COUNTRY = 50;

    const EXPECTED_COMPANIES_FILTERED_BY_STATE = 2;

    const EXPECTED_COMPANIES_FILTERED_BY_CITY = 10;

    let selected = 0;

    // country e.g United States
    await applyFilterByCountry(page, 'United States', selected);

    await expect(page.getByTestId('investors').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_COUNTRY,
    );

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // state e.g Texas
    await applyFilterByState(page, 'Texas', selected);

    await expect(page.getByTestId('investors').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_STATE,
    );

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // city e.g Singapore
    await applyFilterByCity(page, 'Singapore', selected);

    await expect(page.getByTestId('investors').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_CITY,
    );
  });
});
