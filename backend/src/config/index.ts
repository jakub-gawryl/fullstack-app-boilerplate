export type AppConfig = {
  host: string;
};

const getConfig = (): AppConfig => {
  const host = process.env.APP_HOST_URL || '';

  return {
    host
  };
};

export {
  getConfig
};