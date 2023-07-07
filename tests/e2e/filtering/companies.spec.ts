import { test, expect } from '@playwright/test';
import { getSelectableWeb3Tags } from '@/utils/helpers';
import {
  applyFilterByCity,
  applyFilterByCountry,
  applyFilterByState,
  applyFilterByTag,
} from '@/tests/factories/filtering';

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

    const tags = getSelectableWeb3Tags();

    await applyFilterByTag(page, tags[0]);

    await expect(page.getByTestId('companies').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_TAG,
    );
  });

  test('should filter by location', async ({ page }) => {
    const EXPECTED_COMPANIES_FILTERED_BY_COUNTRY = 3;

    const EXPECTED_COMPANIES_FILTERED_BY_STATE = 20;

    const EXPECTED_COMPANIES_FILTERED_BY_CITY = 1;

    let selected = 0;

    // country e.g India
    await applyFilterByCountry(page, 'India', selected);

    await expect(page.getByTestId('companies').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_COUNTRY,
    );

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // state e.g California
    await applyFilterByState(page, 'California', selected);

    await expect(page.getByTestId('companies').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_STATE,
    );

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // city e.g Berlin
    await applyFilterByCity(page, 'Berlin', selected);

    await expect(page.getByTestId('companies').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_CITY,
    );
  });
});
