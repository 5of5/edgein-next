import { z } from 'zod';

const EnvSchema = z.object({
  // AWS SES
  AWS_SES_ACCESS_KEY_ID: z.string(),
  AWS_SES_ACCESS_SECRET_KEY: z.string(),
  AWS_SES_REGION: z.string().default('us-east-1'),
  SES_SOURCE: z.string().default('EdgeIn Support <support@edgein.io>'),
  // auth0
  AUTH0_CLIENT_SECRET: z.string(),
  AUTH0_MANAGEMENT_CLIENT_ID: z.string(),
  AUTH0_MANAGEMENT_CLIENT_SECRET: z.string(),
  AUTH0_MANAGEMENT_DOMAIN: z.string(),
  // NextJS + Auth0
  NEXT_PUBLIC_AUTH0_CLIENT_ID: z.string(),
  NEXT_PUBLIC_AUTH0_REDIRECT_URL: z.string(),
  NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;
export const env = EnvSchema.parse(process.env);
