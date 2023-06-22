import { random } from 'lodash';

export const getSignUpPayload = () => {
  const uniqueId = random(1, 800);

  return {
    name: 'Jessica Taggart',
    email: `jessica${uniqueId}@iluma.xyz`,
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