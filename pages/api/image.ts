import aws, { S3 } from 'aws-sdk';
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

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: req.query.file,
  };

  const stream = s3
    .getObject(<S3.GetObjectRequest>params)
    .createReadStream()
    .on('error', (err) => {
      res.status(500).send({ error: err });
    });

  res.status(200).send(stream);
}
