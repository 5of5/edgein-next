import { z } from 'zod';
import mapValues from 'lodash/mapValues';
import {
  LIST_NAME_MIN_LENGTH,
  LIST_NAME_MAX_LENGTH,
  GROUP_NAME_MAX_LENGTH,
  GROUP_DESCRIPTION_MAX_LENGTH,
} from './constants';

export const extractErrors = <T>(
  fieldErrors: Partial<Record<keyof T, string[] | string>>,
) => {
  return mapValues(fieldErrors, o => o?.[0] || '');
};

export const groupSchema = z.object({
  name: z
    .string()
    .max(
      GROUP_NAME_MAX_LENGTH,
      `Group name should be maximum of ${GROUP_NAME_MAX_LENGTH} characters.`,
    ),
  description: z
    .string()
    .max(
      GROUP_DESCRIPTION_MAX_LENGTH,
      `Group description should be maximum of ${GROUP_DESCRIPTION_MAX_LENGTH} characters.`,
    ),
});

export type GroupSchemaType = z.infer<typeof groupSchema>;

export const listSchema = z.object({
  name: z
    .string()
    .min(
      LIST_NAME_MIN_LENGTH,
      `List name should have at least ${LIST_NAME_MIN_LENGTH} characters.`,
    )
    .max(
      LIST_NAME_MAX_LENGTH,
      `List name should be maximum of ${LIST_NAME_MAX_LENGTH} characters.`,
    ),
});
