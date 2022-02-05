import { runPrecheck } from '../precheck';

describe('runPrecheck', () => {
  const env = process.env;

  afterEach(() => {
    process.env = {...env};
  });

  it ('resolves correctly, when required var is not set', async () => {
    process.env = {
      APP_HOST_URL: undefined
    };

    await expect(runPrecheck()).resolves.toBe(undefined);
  });

  it ('resolves, when required var is set correctly', async () => {
    process.env = {
      PRECHECK_REQUIRED_ENV_VARS: 'APP_HOST_URL',
      APP_HOST_URL: 'http://dummy.com/'
    };

    await expect(runPrecheck()).resolves.toBe(undefined);
  });

  it ('resolves, when required var is set as whitespace', async () => {
    process.env = {
      PRECHECK_REQUIRED_ENV_VARS: '   ',
      APP_HOST_URL: undefined
    };

    await expect(runPrecheck()).resolves.toBe(undefined);
  });

  it ('fails, when required APP_HOST_URL is missing', async () => {
    process.env = {
      PRECHECK_REQUIRED_ENV_VARS: 'APP_HOST_URL',
      APP_HOST_URL: undefined
    };

    await expect(runPrecheck()).rejects.toEqual('❌ Variable(s): APP_HOST_URL are required to run the application!');
  });
});