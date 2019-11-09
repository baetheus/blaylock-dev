import { Environment } from './environment';

export const environment: Environment = {
  production: true,
  useMocks: false,
  showLogs: false,
  refreshInterval: 5 * 1000,
  versionUrl: 'https://gitlab.com/baetheus/blaylock-dev/-/tags/v',
  version: process.env.CI_COMMIT_TAG || 'Unknown',
};
