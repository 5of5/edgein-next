import { z, ZodSchema } from 'zod';
import mapValues from 'lodash/mapValues';
import { Lists } from '@/graphql/types';
import { MAXIMUM_ITEMS_ON_LIST } from './constants';

export const zodValidate = (values: unknown, schema: ZodSchema) => {
  let success = false;
  let errors: Record<string, string[] | undefined> | undefined;

  const schemaValidationResult = schema.safeParse(values);

  if (!schemaValidationResult.success) {
    const { fieldErrors } = schemaValidationResult.error.flatten();
    errors = fieldErrors;
  } else {
    success = true;
  }

  return { success, errors };
};

export const extractErrors = <T>(
  fieldErrors: Partial<Record<keyof T, string[] | string>>,
) => {
  return mapValues(fieldErrors, o => o?.[0] || '');
};
