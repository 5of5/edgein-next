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
    let selected = 0;

    await page.getByRole('button', { name: /Upcoming/i }).click();

    await expect(page.getByRole('button', { name: /Upcoming/i })).toHaveClass(
      /border-primary-500/,
    );

    await page.getByRole('button', { name: /Add filter/i }).click();

    await expect(page.getByText(/Event types/i)).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Select type/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Select type/i }).click();

    await expect(page.getByText(`Event type (${selected})`)).toBeVisible();

    await expect(page.getByRole('checkbox', { name: 'Web3' })).toBeVisible();

    await page.getByRole('checkbox', { name: 'Web3' }).check();

    selected = 1;

    await expect(page.getByText(`Event type (${selected})`)).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(4);
  });

  test('should filter upcoming events by location', async ({ page }) => {
    let selected = 0;

    await page.getByRole('button', { name: /Upcoming/i }).click();

    await expect(page.getByRole('button', { name: /Upcoming/i })).toHaveClass(
      /border-primary-500/,
    );

    // country e.g Germany
    await page.getByRole('button', { name: /Add filter/i }).click();

    await expect(
      page.getByRole('heading', { name: /Location/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Add country/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Add country/i }).click();

    await expect(page.getByText(`Country (${selected})`)).toBeVisible();

    await page
      .getByPlaceholder(/Add country name, press enter/i)
      .fill('Germany');

    await page.keyboard.press('Enter');

    selected = 1;

    await expect(page.getByText(`Country (${selected})`)).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(2);

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // state e.g Berlin
    await page.getByRole('button', { name: /Add filter/i }).click();

    await expect(
      page.getByRole('heading', { name: /Location/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Add state/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Add state/i }).click();

    await expect(page.getByText(`State (${selected})`)).toBeVisible();

    await page.getByPlaceholder(/Add state name, press enter/i).fill('Berlin');

    await page.keyboard.press('Enter');

    selected = 1;

    await expect(page.getByText(`State (${selected})`)).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(1);

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // city e.g Dubai
    await page.getByRole('button', { name: /Add filter/i }).click();

    await expect(page.locator('h3', { hasText: /Location/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Add city/i })).toBeVisible();

    await page.getByRole('button', { name: /Add city/i }).click();

    await expect(page.getByText(`City (${selected})`)).toBeVisible();

    await page.getByPlaceholder(/Add city name, press enter/i).fill('Dubai');

    await page.keyboard.press('Enter');

    selected = 1;

    await expect(page.getByText(`City (${selected})`)).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(1);
  });

  test('should filter past events by event type e.g Web3', async ({ page }) => {
    let selected = 0;

    await page.getByRole('button', { name: /Past/i }).click();

    await expect(page.getByRole('button', { name: /Past/i })).toHaveClass(
      /border-primary-500/,
    );

    await page.getByRole('button', { name: /Add filter/i }).click();

    await expect(page.getByText(/Event types/i)).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Select type/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Select type/i }).click();

    await expect(page.getByText(`Event type (${selected})`)).toBeVisible();

    await expect(page.getByRole('checkbox', { name: 'Web3' })).toBeVisible();

    await page.getByRole('checkbox', { name: 'Web3' }).check();

    selected = 1;

    await expect(page.getByText(`Event type (${selected})`)).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(7);
  });

  test('should filter past events by location', async ({ page }) => {
    let selected = 0;

    await page.getByRole('button', { name: /Past/i }).click();

    await expect(page.getByRole('button', { name: /Past/i })).toHaveClass(
      /border-primary-500/,
    );

    // country e.g Turkey
    await page.getByRole('button', { name: /Add filter/i }).click();

    await expect(
      page.getByRole('heading', { name: /Location/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Add country/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Add country/i }).click();

    await expect(page.getByText(`Country (${selected})`)).toBeVisible();

    await page
      .getByPlaceholder(/Add country name, press enter/i)
      .fill('Turkey');

    await page.keyboard.press('Enter');

    selected = 1;

    await expect(page.getByText(`Country (${selected})`)).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(2);

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // state e.g Texas
    await page.getByRole('button', { name: /Add filter/i }).click();

    await expect(
      page.getByRole('heading', { name: /Location/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Add state/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Add state/i }).click();

    await expect(page.getByText(`State (${selected})`)).toBeVisible();

    await page.getByPlaceholder(/Add state name, press enter/i).fill('Texas');

    await page.keyboard.press('Enter');

    selected = 1;

    await expect(page.getByText(`State (${selected})`)).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(3);

    await page.getByRole('button', { name: /Reset/i }).click();

    selected = 0;

    // state e.g Istanbul
    await page.getByRole('button', { name: /Add filter/i }).click();

    await expect(
      page.getByRole('heading', { name: /Location/i }),
    ).toBeVisible();
    await expect(page.getByRole('button', { name: /Add city/i })).toBeVisible();

    await page.getByRole('button', { name: /Add city/i }).click();

    await expect(page.getByText(`City (${selected})`)).toBeVisible();

    await page.getByPlaceholder(/Add city name, press enter/i).fill('Istanbul');

    await page.keyboard.press('Enter');

    selected = 1;

    await expect(page.getByText(`City (${selected})`)).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(2);
  });

  test('should filter upcoming events by size', async ({ page }) => {
    await page.getByRole('button', { name: /Upcoming/i }).click();

    await expect(page.getByRole('button', { name: /Upcoming/i })).toHaveClass(
      /border-primary-500/,
    );

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

    await expect(
      page.locator('li > div', { hasText: '1,001 - 5,000 people' }),
    ).toBeVisible();

    await page.locator('li > div', { hasText: '1,001 - 5,000 people' }).click();

    await expect(
      page.locator('span', { hasText: '1,001 - 5,000 people' }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(2);
  });

  test('should filter past events by size', async ({ page }) => {
    await page.getByRole('button', { name: /Past/i }).click();

    await expect(page.getByRole('button', { name: /Past/i })).toHaveClass(
      /border-primary-500/,
    );

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

    await expect(
      page.locator('li > div', { hasText: '1,001 - 5,000 people' }),
    ).toBeVisible();

    await page.locator('li > div', { hasText: '1,001 - 5,000 people' }).click();

    await expect(
      page.locator('span', { hasText: '1,001 - 5,000 people' }),
    ).toBeVisible();

    await page.getByRole('button', { name: /Apply/i }).click();

    await expect(page.getByTestId('events').getByRole('link')).toHaveCount(3);
  });
});
