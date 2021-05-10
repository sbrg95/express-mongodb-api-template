import { merge } from 'lodash';
import devConfig from './dev';
import testConfig from './test';

const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: process.env.PORT || 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d',
  },
  dbUrl: process.env.DB_URL,
};

let envConfig = {};

switch (env) {
  case 'dev':
  case 'development':
    envConfig = devConfig;
    break;
  case 'test':
  case 'testing':
    envConfig = testConfig;
    break;
  default:
    envConfig = devConfig;
}

export default merge(baseConfig, envConfig);
