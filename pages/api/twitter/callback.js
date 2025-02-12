import axios from "axios";
import { parse,serialize } from "cookie";
import { Buffer } from "buffer";


export default async function handler(req, res) {
  console.log("Incoming query:", req.query);
  console.log("Incoming headers:", req.headers);

  const { code, state } = req.query;
  console.log("Code =>",code)
  const cookies = parse(req.headers.cookie || ""); // ✅ Parse cookies properly

  console.log("Parsed Cookies:", cookies);

  const codeVerifier = cookies.code_verifier;
  const storedState = cookies.state;

  console.log("Stored State:", storedState);
  console.log("Received State:", state);
  console.log("Stored Code Verifier:", codeVerifier);

  // ✅ Ensure both state and code_verifier exist and match
  if (!codeVerifier || !storedState || storedState !== state) {
    return res
      .status(400)
      .json({
        error: "Invalid request: Missing or mismatched state/code_verifier",
      });
  }

  try {
    const tokenUrl = process.env.TWITTER_TOKEN_URL; // "https://api.twitter.com/2/oauth2/token"
    const clientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
    const clientSecret = process.env.TWITTER_CLIENT_SECRET; // Ensure this is set in `.env.local`

    // ✅ Ensure `Authorization` header is set correctly
    const authHeader = `Basic ${Buffer.from(
      `${clientId}:${clientSecret}`,
    ).toString('base64')}`;

    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        redirect_uri: process.env.NEXT_PUBLIC_TWITTER_REDIRECT_URI,
        code,
        code_verifier: codeVerifier, // ✅ Must be the correct stored verifier
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: authHeader, // ✅ Ensure this is included
        },
      },
    );

    const { access_token, refresh_token } = response.data;

    console.log('Token Response:', response.data);
    res.setHeader('Set-Cookie', [
      serialize('access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      }),
      serialize('refresh_token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      }),
    ]);

    // Redirecting to Xade ai website (need to be deployed first)
    res.writeHead(302, {
      Location: process.env.NEXT_REDIRECT_SITE,
    });

    res.end();
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ error: 'Failed to exchange token' });
  }
}
