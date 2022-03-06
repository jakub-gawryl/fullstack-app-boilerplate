declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production';
      PRECHECK_REQUIRED_ENV_VARS?: string;
      APP_HOST_URL?: string;
      APP_PROD_PORT?: string;
      APP_DB_URL?: string;
      APP_JWT_SECRET?: string;
      APP_JWT_EXPIRES_IN?: string;
    }
  }
}

export {};