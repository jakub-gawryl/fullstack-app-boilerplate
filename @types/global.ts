declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production';
      PRECHECK_REQUIRED_ENV_VARS?: string;
      APP_HOST_URL: string;
    }
  }
}

export {};