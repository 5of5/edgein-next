export const redirect_url = (): string => {
  return process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL!;
};
