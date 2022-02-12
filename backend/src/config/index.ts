import { isProdEnv } from '../utils';

export interface AppConfig {
  host: string;
  port: number;
  dbUrl: string;
}

const getConfig = (): AppConfig => {
  const envProdPort = (isProdEnv() && process.env.APP_PROD_PORT)
    ? parseInt(process.env.APP_PROD_PORT)
    : null;

  const host = process.env.APP_HOST_URL || 'http://localhost:5000';
  const port = envProdPort || 5000;

  return {
    host,
    port,
    dbUrl: process.env.APP_DB_URL || ''
  };
};

export {
  getConfig
};