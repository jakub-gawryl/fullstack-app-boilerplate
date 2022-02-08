import { runPrecheck } from '../precheck';

describe('runPrecheck', () => {
  const env = process.env;

  afterEach(() => {
    process.env = {...env};
  });

  it ('resolves, when required var is not set', async () => {
    process.env = {
      NODE_ENV: 'production',
      APP_HOST_URL: undefined
    };

    await expect(runPrecheck()).resolves.toBe(undefined);
  });

  it ('resolves, when required var is set correctly', async () => {
    process.env = {
      NODE_ENV: 'production',
      PRECHECK_REQUIRED_ENV_VARS: 'APP_HOST_URL',
      APP_HOST_URL: 'http://dummy.com/'
    };

    await expect(runPrecheck()).resolves.toBe(undefined);
  });

  it ('resolves, when required var is set as whitespace', async () => {
    process.env = {
      NODE_ENV: 'production',
      PRECHECK_REQUIRED_ENV_VARS: '   ',
      APP_HOST_URL: undefined
    };

    await expect(runPrecheck()).resolves.toBe(undefined);
  });

  it ('fails, when required APP_HOST_URL is missing', async () => {
    process.env = {
      NODE_ENV: 'production',
      PRECHECK_REQUIRED_ENV_VARS: 'APP_HOST_URL',
      APP_HOST_URL: undefined
    };

    await expect(runPrecheck()).rejects.toEqual('❌ Variable: APP_HOST_URL is required to run the application!');
  });

  it ('fails, when two vars is missing', async () => {
    process.env = {
      NODE_ENV: 'production',
      PRECHECK_REQUIRED_ENV_VARS: 'APP_HOST_URL,SOME_OTHER',
      APP_HOST_URL: undefined,
      SOME_OTHER: undefined
    };

    await expect(runPrecheck()).rejects.toEqual('❌ Variables: APP_HOST_URL,SOME_OTHER are required to run the application!');
  });
});