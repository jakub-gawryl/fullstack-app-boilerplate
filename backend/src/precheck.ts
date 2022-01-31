import dotenv from 'dotenv';

const isProduction =  process.env.NODE_ENV === 'production';

dotenv.config({
  path: isProduction ? '.env' : '../.env.development'
});

// Env variables that are required to run app
const requiredEnvVars = [
  'APP_HOST_URL'
];

const missingVars = [];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    missingVars.push(envVar);
  }
});

if (missingVars.length > 0) {
  throw Error(`❌ Wariables: ${missingVars.join(',')} are required to run the application!`);
}