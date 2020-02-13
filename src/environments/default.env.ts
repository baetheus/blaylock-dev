import { Environment } from './environment';

export const environment: Environment = {
  production: false,
  useMocks: true,
  showLogs: true,
  refreshInterval: 5 * 1000,
  versionUrl: 'https://github.com/baetheus/blaylock-dev/releases/tag/v',
  version: 'Unknown',
};
