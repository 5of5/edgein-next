import { z } from 'zod';
import { EMAIL_MAX_LENGTH } from './constants';

export const findPeopleByEmailSchema = z
  .string()
  .nonempty('Email is required.')
  .max(
    EMAIL_MAX_LENGTH,
    `Email should be maximum of ${EMAIL_MAX_LENGTH} characters.`,
  );

export const inviteToEdgeInPayloadSchema = z
  .object({
    email: z
      .string()
      .nonempty('Email is required')
      .max(
        EMAIL_MAX_LENGTH,
        `Email should be maximum of ${EMAIL_MAX_LENGTH} characters.`,
      ),
    personId: z.optional(z.number()),
  })
  .array();
