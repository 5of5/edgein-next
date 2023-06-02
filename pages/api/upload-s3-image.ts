import { NextApiResponse, NextApiRequest } from 'next';
import AWS from 'aws-sdk';
import path from 'path';

//AWS config set
AWS.config.update({
  accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY || '',
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // get extension of the file, prefix with  a dot if extension is found
    const ext = getExt(req.query.file);

    const fileName = new Date().valueOf();

    // upload key is unique id with .extension if any
    const fileNameWithExtension = `${fileName}${ext}`;

    // create s3 instance.
    const s3 = new AWS.S3({
      signatureVersion: 'v4',
      region: process.env.AWS_BUCKET_REGION || '',
    });

    // url generation options
    const options = {
      Bucket: process.env.AWS_BUCKET,
      Key: fileNameWithExtension,
      Expires: 5 * 60, // in seconds
      ACL: 'public-read',
      ContentType: req.body.fileType,
    };

    //creating signed url for frontend
    const url = await s3.getSignedUrlPromise('putObject', options);
    res.status(200).json({
      url,
      file: {
        id: fileName,
        url: `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${fileNameWithExtension}`,
        type: req.body.fileType,
        filename: fileNameWithExtension,
      },
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
/**
 * @purpose function to fetch the extension of file
 * @param val
 * @returns string : extenstion of file
 */
function getExt(val: any) {
  let ext = path.extname(val);
  ext = ext.replace(/\W/g, '');
  return ext.length > 0 ? `.${ext}` : '';
}

export default handler;
