const { parse, stringify } = require('envfile')
const fs = require('fs');
const { exit } = require('process');

const ENV_EXAMPLE = '.env.example';
const ENV_PROD = '.env.production';
const ENV_TARGET = 'build/.env';

const getCleanEnvFile = async () => {
  const content = await fs.readFileSync(ENV_EXAMPLE, 'utf-8');
  const parsed = parse(content);

  const emptyKeys = Object.keys(parsed).reduce((acc, item) => {
    acc[item] = '';
    return acc;
  }, {});

  return stringify(emptyKeys);
};

const writeProdEnv = async (content) => {
  await fs.writeFileSync(ENV_TARGET, content);
};

const runTask = async () => {
  const isProdEnvPresent = await fs.existsSync(ENV_PROD);
  
  if (isProdEnvPresent) {
    console.log(`✔ ${ENV_PROD} FOUND - copying to ${ENV_TARGET}`);
    await fs.copyFileSync(ENV_PROD, ENV_TARGET);
  }
  else {
    console.warn(`⚠ ${ENV_PROD} NOT FOUND, ${ENV_TARGET} NOT created!`);
    // const cleaned = await getCleanEnvFile();
    // await writeProdEnv(cleaned);
  }

  exit(0);
};

runTask();