import { z } from 'zod';

const EnvSchema = z.object({
  AWS_SES_ACCESS_KEY_ID: z.string(),
  AWS_SES_ACCESS_SECRET_KEY: z.string(),
  AWS_SES_REGION: z.string().default('us-east-1'),
  SES_SOURCE: z.string().default('EdgeIn Support <support@edgein.io>'),
});

export type Env = z.infer<typeof EnvSchema>;
export const env = EnvSchema.parse(process.env);
