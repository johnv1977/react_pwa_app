export const APP_CONFIG = {
  NAME: process.env.REACT_APP_NAME || 'DnuGame',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production'
};

export default APP_CONFIG;
