import Minio from 'minio';
import envConfig from '../config/env.config';

const minioCon = envConfig.minio;

const minioClient = new Minio.Client({
  endPoint: minioCon.endPoint,
  port: minioCon.port,
  useSSL: minioCon.useSSL,
  accessKey: minioCon.accessKey,
  secretKey: minioCon.secretKey,
});

export default minioClient;
