import Constants from 'expo-constants';

const ENV = {
  dev: {
    domain: 'http://192.168.1.10:3000'
  },
  staging: {
    domain: 'https://tgwfc-stg.herokuapp.com'
  },
  prod: {
    domain: 'https://tgwfc-prod.herokuapp.com'
  }
};

function getEnvVars(env = '') {
  if (env.indexOf('staging') !== -1) return ENV.staging;
  if (env.indexOf('default') !== -1) return ENV.prod;
  return ENV.dev;
}

export default getEnvVars(Constants.manifest.releaseChannel);
