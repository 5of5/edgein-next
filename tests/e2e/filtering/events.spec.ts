import {
  applyFilterByCity,
  applyFilterByCountry,
  applyFilterByEventType,
  applyFilterBySize,
  applyFilterByState,
} from '@/tests/factories/filtering';
import { test, expect } from '@playwright/test';

test.describe('Events', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/`);

    await page.getByRole('link', { name: /Events/ }).click();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('should filter upcoming events by event type e.g Web3', async ({
    page,
  }) => {
    const EXPECTED_COMPANIES_FILTERED_BY_TYPE = 3;

    await page.getByRole('button', { name: /Upcoming/i }).click();

    await expect(page.getByRole('button', { name: /Upcoming/i })).toHaveClass(
      /border-primary-500/,
    );

    await applyFilterByEventType(page, 'Web3');

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_TYPE,
    );
  });

  test('should filter upcoming events by location', async ({ page }) => {
    const EXPECTED_COMPANIES_FILTERED_BY_COUNTRY = 1;

    const EXPECTED_COMPANIES_FILTERED_BY_STATE = 5;

    const EXPECTED_COMPANIES_FILTERED_BY_CITY = 1;

    let selected = 0;

    await page.getByRole('button', { name: /Upcoming/i }).click();

    await expect(page.getByRole('button', { name: /Upcoming/i })).toHaveClass(
      /border-primary-500/,
    );

    // country e.g Germany
    await applyFilterByCountry(page, 'Germany', selected);

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_COUNTRY,
    );

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // state e.g California
    await applyFilterByState(page, 'California', selected);

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_STATE,
    );

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // city e.g Dubai
    await applyFilterByCity(page, 'Dubai', selected);

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_CITY,
    );
  });

  test('should filter past events by event type e.g Web3', async ({ page }) => {
    const EXPECTED_COMPANIES_FILTERED_BY_TYPE = 8;

    await page.getByRole('button', { name: /Past/i }).click();

    await expect(page.getByRole('button', { name: /Past/i })).toHaveClass(
      /border-primary-500/,
    );

    await applyFilterByEventType(page, 'Web3');

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_TYPE,
    );
  });

  test('should filter past events by location', async ({ page }) => {
    const EXPECTED_COMPANIES_FILTERED_BY_COUNTRY = 2;

    const EXPECTED_COMPANIES_FILTERED_BY_STATE = 3;

    const EXPECTED_COMPANIES_FILTERED_BY_CITY = 2;

    let selected = 0;

    await page.getByRole('button', { name: /Past/i }).click();

    await expect(page.getByRole('button', { name: /Past/i })).toHaveClass(
      /border-primary-500/,
    );

    // country e.g Turkey
    await applyFilterByCountry(page, 'Turkey', selected);

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_COUNTRY,
    );

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // state e.g Texas
    await applyFilterByState(page, 'Texas', selected);

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_STATE,
    );

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // city e.g Istanbul
    await applyFilterByCity(page, 'Istanbul', selected);

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_CITY,
    );
  });

  test('should filter upcoming events by size', async ({ page }) => {
    const EXPECTED_COMPANIES_FILTERED_BY_SIZE = 1;

    await page.getByRole('button', { name: /Upcoming/i }).click();

    await expect(page.getByRole('button', { name: /Upcoming/i })).toHaveClass(
      /border-primary-500/,
    );

    await applyFilterBySize(page, '1,001 - 5,000 people');

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_SIZE,
    );
  });

  test('should filter past events by size', async ({ page }) => {
    const EXPECTED_COMPANIES_FILTERED_BY_SIZE = 4;

    await page.getByRole('button', { name: /Past/i }).click();

    await expect(page.getByRole('button', { name: /Past/i })).toHaveClass(
      /border-primary-500/,
    );

    await applyFilterBySize(page, '1,001 - 5,000 people');

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(
      EXPECTED_COMPANIES_FILTERED_BY_SIZE,
    );
  });
});
