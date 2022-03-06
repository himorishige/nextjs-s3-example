import aws from 'aws-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.REGION,
    signatureVersion: 'v4',
  });

  const s3 = new aws.S3();
  const downloadUrl = await s3.getSignedUrlPromise('getObject', {
    Bucket: process.env.BUCKET_NAME,
    Key: req.query.file,
    Expires: 60,
  });

  const data = {
    src: downloadUrl,
  };

  res.status(200).json(data);
}
