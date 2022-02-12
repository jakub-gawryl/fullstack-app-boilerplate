declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production';
      PRECHECK_REQUIRED_ENV_VARS?: string;
      APP_HOST_URL?: string;
      APP_PROD_PORT?: string;
      APP_DB_URL?: string;
    }
  }
}

export {};