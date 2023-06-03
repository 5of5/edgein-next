import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_SECRET_TOKEN) {
    return res
      .status(401)
      .json({ message: 'Invalid token', secret: req.query.secret });
  }

  try {
    const path =
      typeof req.query.page === 'string' ? req.query.page : req.query.page[0];
    await res.unstable_revalidate(
      `${path}?revalidation_auth=${process.env.REVALIDATION_AUTH_TOKEN}`,
    );
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err);
    return res
      .status(500)
      .send(`Error revalidating ${JSON.stringify(err, null, 2)}`);
  }
};

export default handler;
