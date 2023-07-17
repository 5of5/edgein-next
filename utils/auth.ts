export const redirect_url = (): string => {
  return process.env.VERCEL_ENV !== 'production'
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL!;
};
