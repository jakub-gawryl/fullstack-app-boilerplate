const isDevEnv = () => process.env.NODE_ENV === 'development' || false;
const isProdEnv = () => process.env.NODE_ENV === 'production' || false;

export {
  isDevEnv,
  isProdEnv
};