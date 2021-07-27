import { promisify } from 'util';
import envConfig from '../config/env.config';
import { logError } from '../../../log/logger';
import minioClient from './minio';

const bucketName = envConfig.minio.bucketName;

export const uploadJpgFromBuffer = async (imgName: string, imgBuffer: Buffer) => {
  try {
    await minioClient.putObject(bucketName, `${imgName}.jpg`, imgBuffer);
    return `${imgName}.jpg`;
  } catch (error) {
    throw logError('ERROR to uploadJpgFromBuffer', error);
  }
};

export const bucketInstance = async () => {
  try {
    if (!minioClient.bucketExists(bucketName)) {
      const makeBucket = promisify(minioClient.makeBucket);
      await makeBucket(bucketName, 'us-east-1');
    }
  } catch (error) {
    throw logError('ERROR to set bucketInstance', error);
  }
};
