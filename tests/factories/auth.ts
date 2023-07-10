import { Page } from '@playwright/test';
import { random } from 'lodash';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload extends LoginPayload {
  name: string;
  reference_id: string;
}

export const getSignUpPayload = (): SignUpPayload => {
  const uniqueId = random(1, 800);

  return {
    name: 'Jessica Taggart',
    email: `jessica${uniqueId}@iluma.xyz`,
    password: `Password123!`,
    reference_id: '',
  };
};

export const getLoginPayload = (): LoginPayload & { name: string } => {
  return {
    name: 'Chidi Eze',
    email: 'chidi.eze@gitstart.dev',
    password: 'Password123!',
  };
};

export const getInvalidLoginPayload = (): LoginPayload => {
  return {
    email: 'chidi.eze@gitstart.dev',
    password: 'password',
  };
};

export const getDuplicateSignUpPayload = (): SignUpPayload => {
  return {
    name: 'Kurt Steven Laxamana',
    email: 'kurt@xld.finance',
    password: 'Password123!',
    reference_id: '',
  };
};

export const getSavedUserPayload = () => {
  return {
    name: 'Kurt Steven Laxamana',
    email: 'kurt@xld.finance',
  };
};

export const loginUser = async (page: Page, loginPayloadData: LoginPayload) => {
  await page.getByRole('button', { name: 'Log In' }).click();

  await page
    .getByRole('textbox', { name: 'email' })
    .fill(loginPayloadData.email);
  await page
    .getByRole('textbox', { name: 'password' })
    .fill(loginPayloadData.password);

  await page.getByRole('button', { name: /^Login$/i }).click();
};

export const signupUser = async (page: Page, payloadData: SignUpPayload) => {
  await page.getByRole('textbox', { name: 'name' }).fill(payloadData.name);
  await page.getByRole('textbox', { name: 'email' }).fill(payloadData.email);
  await page
    .getByRole('textbox', { name: 'password' })
    .fill(payloadData.password);

  await page
    .getByRole('button', { name: /Sign up\s+(with referral|and explore)$/i })
    .click();
};
