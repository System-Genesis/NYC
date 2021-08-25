import * as S3 from 'aws-sdk/clients/s3';
import envConfig from '../config/env.config';

const { bucketName, region, accessKeyId, secretAccessKey } = envConfig.s3;

const s3: S3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
export const uploadFile = (fileName: string, fileBuffer: Buffer) => {
  const uploadParams: S3.PutObjectRequest = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
  };

  return s3.upload(uploadParams).promise();
};
