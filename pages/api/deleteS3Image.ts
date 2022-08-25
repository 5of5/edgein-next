import { NextApiResponse, NextApiRequest } from "next";
import AWS from "aws-sdk";

//AWS config set
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // get extension of the file, prefix with  a dot if extension is found
    let fileName = req.query.file;

    // create s3 instance.
    const s3 = new AWS.S3({
      signatureVersion: "v4",
      region: process.env.AWS_REGION!,
    });

    await s3.deleteObject({ Bucket: process.env.AWS_BUCKET, Key: fileName }).promise();
    res.send({ success: true })
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export default handler;
