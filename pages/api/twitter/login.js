export const config = {
  runtime: 'nodejs',
};

import { serialize } from 'cookie';
import crypto from 'crypto'; // ✅ Import crypto
import cors, { runMiddleware } from '../../../lib/cors';
import applyCors from '../../../lib/cors';

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  const {
    NEXT_PUBLIC_TWITTER_CLIENT_ID,
    NEXT_PUBLIC_TWITTER_REDIRECT_URI,
    NEXT_PUBLIC_TWITTER_SCOPES,
    NEXT_PUBLIC_TWITTER_AUTH_URL,
    NEXT_REDIRECT_SITE,
  } = process.env;

  const state = Math.random().toString(36).substring(7); // CSRF Protection
  const codeVerifier = crypto.randomBytes(32).toString('hex'); // ✅ More secure Code Verifier

  // ✅ Generate SHA256 hash of codeVerifier & encode it properly
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, ''); // ✅ base64url encoding

  console.log('State from login =>', state);
  console.log('codeVerify from login =>', codeVerifier);
  console.log('codeChallenge from login =>', codeChallenge);

  const twitterAuthUrl = `${NEXT_PUBLIC_TWITTER_AUTH_URL}?response_type=code&client_id=${NEXT_PUBLIC_TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    NEXT_PUBLIC_TWITTER_REDIRECT_URI,
  )}&scope=${encodeURIComponent(
    `${NEXT_PUBLIC_TWITTER_SCOPES} offline.access`,
  )}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

  res.setHeader('Set-Cookie', [
    serialize('code_verifier', codeVerifier, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: '/',
    }),
    serialize('state', state, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: '/',
    }),
  ]);

  res.json({ url: twitterAuthUrl });
}
