import { IBaseEntity, Timestamps } from '@app/database/types';

export const OMIT_TIMESTAMPS_IN_CREATE_INPUT: (keyof Timestamps)[] = [
  'createdAt',
  'updatedAt',
  'deletedAt',
];

/**
 * Contains attributes which should not be exposed in the CreateDTO objects
 */
export const OMIT_IN_CREATE_INPUT: (keyof IBaseEntity)[] = [
  'id',
  ...OMIT_TIMESTAMPS_IN_CREATE_INPUT,
];
