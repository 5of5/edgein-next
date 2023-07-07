import { Page, expect } from '@playwright/test';

export const getSignUpPayload = () => {
  return {
    name: 'Jessica Taggart',
    email: 'jessica3@iluma.xyz',
    password: `Password123!`,
    reference_id: '',
  };
};

export const getLoginPayload = () => {
  return {
    name: 'Chidi Eze',
    email: 'chidi.eze@gitstart.dev',
    password: 'Password123!',
  };
};

export const getInvalidLoginPayload = () => {
  return {
    email: 'chidi.eze@gitstart.dev',
    password: 'password',
  };
};

export const getDuplicateSignUpPayload = () => {
  return {
    name: 'Kurt Steven Laxamana',
    email: 'kurt@xld.finance',
    password: 'Password123!',
  };
};

export const getSavedUserPayload = () => {
  return {
    name: 'Kurt Steven Laxamana',
    email: 'kurt@xld.finance',
  };
};

export const loginUser = async (page: Page) => {
  const loginPayloadData = getLoginPayload();

  await page.getByRole('button', { name: 'Log In' }).click();

  await page
    .getByRole('textbox', { name: 'email' })
    .fill(loginPayloadData.email);
  await page
    .getByRole('textbox', { name: 'password' })
    .fill(loginPayloadData.password);

  await page.getByRole('button', { name: /^Login$/i }).click();

  await expect(
    page
      .getByAltText('profile')
      .or(page.getByRole('img', { name: loginPayloadData.name })),
  ).toBeVisible({ timeout: 15000 });
};
