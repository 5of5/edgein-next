import Cors from 'cors';

// Initializing the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: '*', // Allow all origins (Change this for production security)
  credentials: true,
});

// Helper function to run middleware in Next.js
export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors; 
