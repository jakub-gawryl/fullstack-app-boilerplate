import dotenv from 'dotenv';
import { isDevEnv } from './utils';

const runPrecheck = (): Promise<void> => new Promise((resolve, reject) => {
  const path = isDevEnv() ? '../.env' : '.env';

  dotenv.config({path});

  // Env variables that are required to run app
  const requiredEnvVars = process.env.PRECHECK_REQUIRED_ENV_VARS?.trim().split(',') || [];
  const missingVars = [];

  requiredEnvVars.filter(item => item).forEach(envVar => {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  });

  if (missingVars.length > 0) {
    return reject(`❌ Variable(s): ${missingVars.join(',')} are required to run the application!`);
  }
  resolve();
});

export {
  runPrecheck
};