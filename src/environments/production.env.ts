import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

import * as pkg from '../../package.json';

import { Package } from './validators';
import { Environment } from './environment';

const version: string = pipe(
  Package.decode(pkg),
  E.map(p => p.version),
  E.getOrElse(() => 'Unknown')
);

export const environment: Environment = {
  production: true,
  useMocks: false,
  showLogs: false,
  refreshInterval: 5 * 1000,
  versionUrl: 'https://gitlab.com/baetheus/blaylock-dev/-/tags/',
  version,
};
