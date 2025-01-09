import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Received Callback:', req.body); // Check the status here
    res.status(200).json({ message: 'Callback received successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
