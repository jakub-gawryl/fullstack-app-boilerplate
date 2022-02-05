export type AppConfig = {
  host: string;
  port: number;
};

const getConfig = (): AppConfig => {
  const host = process.env.APP_HOST_URL || 'http://localhost:5000';
  const port = process.env.APP_PROD_PORT ? parseInt(process.env.APP_PROD_PORT) : 5000;

  return {
    host,
    port
  };
};

export {
  getConfig
};