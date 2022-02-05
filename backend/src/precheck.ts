import dotenv from 'dotenv';

dotenv.config();

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