import dotenv from 'dotenv';
import { isProdEnv } from '../utils';

const isProd = isProdEnv();

dotenv.config({
  path: isProd ? '.env' : '../.env'
});

const runPrecheck = (): Promise<void> => new Promise((resolve, reject) => {
  const requiredEnvVars = process.env.PRECHECK_REQUIRED_ENV_VARS?.trim().split(',') || [];
  const missingVars = [];

  requiredEnvVars.filter(item => item).forEach(envVar => {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  });

  if (missingVars.length > 0) {
    const plural = missingVars.length > 1;
    const missingStr = missingVars.join(',');

    return reject(`❌ Variable${plural ? 's' : ''}: ${missingStr} ${plural ? 'are' : 'is'} required to run the application!`);
  }

  resolve();
});

export { runPrecheck };