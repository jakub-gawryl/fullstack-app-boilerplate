import { isProdEnv } from '../utils';

export interface AppConfig {
  host: string;
  port: number;
  dbUrl: string;
  jwt: {
    secret: string;
    expiresIn: string;
  }
}

const getConfig = (): AppConfig => {
  const envProdPort = (isProdEnv() && process.env.APP_PROD_PORT)
    ? parseInt(process.env.APP_PROD_PORT)
    : null;

  return {
    host: process.env.APP_HOST_URL || 'http://localhost:5000',
    port: envProdPort || 5000,
    dbUrl: process.env.APP_DB_URL || '',
    jwt: {
      secret: process.env.APP_JWT_SECRET || '',
      expiresIn: process.env.APP_JWT_EXPIRES_IN || '6h'
    }
  };
};

export {
  getConfig
};