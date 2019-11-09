import { Environment } from './environment';

export const environment: Environment = {
  production: true,
  useMocks: false,
  showLogs: false,
  refreshInterval: 5 * 1000,
  versionUrl: 'https://github.com/baetheus/blaylock-dev/releases/tag/v',
  version: process.env.CI_COMMIT_TAG || 'Unknown',
};
