import z from 'zod';

export type CreateLeadsReqSchemaType = z.infer<typeof CreateLeadsReqSchema>;
export const CreateLeadsReqSchema = z.object({
  firstName: z.string().optional(), // Nullable field
  lastName: z.string().optional(), // Nullable field
  email: z.string().email(),
  phone: z.string().optional(), // Nullable field
  linkedinUrl: z.string().optional(), // Nullable field
  companyName: z.string().optional(), // Nullable field
  website: z.string().optional(), // Nullable field
  source: z.string().optional(), // Nullable field
  campaignId: z.string().optional(), // Nullable field
  instantlyId: z.string().optional(), // Nullable field
  status: z.string().optional(), // Default: Pending
  emailDomain: z.string().optional(), // Nullable field
  convertedUserid: z.number().optional(), // Nullable field
});

export type CreateLeadsSegmentationReqSchemaType = z.infer<
  typeof CreateLeadsSegmentationReqSchema
>;
export const CreateLeadsSegmentationReqSchema = z.object({
  name: z.string().optional(), // Nullable field
  description: z.string().optional(), // Nullable field
  sql: z.string().optional(), // Nullable field
  campaignId: z.string(),
  status: z.string().optional(), // Default: Inactive
});
