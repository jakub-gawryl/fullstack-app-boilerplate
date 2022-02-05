import { isDevEnv, isProdEnv } from './index';

describe('isDevEnv', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('returns true for production', () => {
    process.env.NODE_ENV = 'production';

    expect(isDevEnv()).toBe(false);
  });

  it('returns false for undefined value', () => {
    process.env.NODE_ENV = undefined;

    expect(isDevEnv()).toBe(false);
  });

  it('returns false for development', () => {
    process.env.NODE_ENV = 'development';

    expect(isDevEnv()).toBe(true);
  });
});

describe('isProdEnv', () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it('returns true for production', () => {
    process.env.NODE_ENV = 'production';

    expect(isProdEnv()).toBe(true);
  });

  it('returns false for undefined value', () => {
    process.env.NODE_ENV = undefined;

    expect(isProdEnv()).toBe(false);
  });

  it('returns false for development', () => {
    process.env.NODE_ENV = 'development';

    expect(isProdEnv()).toBe(false);
  });
});

