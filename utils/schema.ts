import { z } from 'zod';
import {
  LIST_NAME_MIN_LENGTH,
  LIST_NAME_MAX_LENGTH,
  GROUP_NAME_MAX_LENGTH,
  GROUP_DESCRIPTION_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
} from './constants';

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

export const groupSchema = z.object({
  name: z
    .string()
    .nonempty('Group name is required')
    .max(
      GROUP_NAME_MAX_LENGTH,
      `Group name should be maximum of ${GROUP_NAME_MAX_LENGTH} characters.`,
    ),
  description: z.optional(
    z
      .string()
      .max(
        GROUP_DESCRIPTION_MAX_LENGTH,
        `Group description should be maximum of ${GROUP_DESCRIPTION_MAX_LENGTH} characters.`,
      ),
  ),
});

export type Group = z.infer<typeof groupSchema>;

export const listSchema = z.object({
  name: z
    .string()
    .nonempty('List name is required')
    .min(
      LIST_NAME_MIN_LENGTH,
      `List name should have at least ${LIST_NAME_MIN_LENGTH} characters.`,
    )
    .max(
      LIST_NAME_MAX_LENGTH,
      `List name should be maximum of ${LIST_NAME_MAX_LENGTH} characters.`,
    ),
});