import { Environment } from './environment';

export const environment: Environment = {
  production: false,
  useMocks: true,
  showLogs: true,
  refreshInterval: 5 * 1000,
  versionUrl: 'https://gitlab.com/baetheus/blaylock-dev/-/tags/',
  version: 'Unknown',
};
