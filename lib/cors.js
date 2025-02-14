// lib/cors.js
export default function applyCors(req, res) {
  const allowedOrigins = [
    'https://9bad-182-48-225-63.ngrok-free.app', // XADEAI
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  // ✅ Handle Preflight Requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true; // Stop execution
  }

  return false; // Continue execution
}
