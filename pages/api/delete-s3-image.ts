import { NextApiResponse, NextApiRequest } from 'next';
import AWS from 'aws-sdk';
import CookieService from '@/utils/cookie';

//AWS config set
AWS.config.update({
  accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY!,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);

  if (!user) {
    return res.status(401).json({
      message: 'Missing token',
    });
  }

  if(user.role !== 'admin') {
    return res.status(401).json({
      message: 'You are not an admin !',
    });
  }

  try {
    // get extension of the file, prefix with  a dot if extension is found
    const fileName: string = req.query.file as string;

    // create s3 instance.
    const s3 = new AWS.S3({
      signatureVersion: 'v4',
      region: process.env.AWS_BUCKET_REGION!,
    });

    const objects = { Bucket: process.env.AWS_BUCKET!, Key: fileName };

    await s3.deleteObject(objects).promise();
    res.send({ success: true });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export default handler;
