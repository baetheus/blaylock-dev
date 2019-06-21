import * as pkg from '../../package.json';
import { environment as def } from './default.env';
import { Environment } from './environment';
import { environment as prod } from './production.env';

let environment!: Environment;
const version = pkg.version || 'unknown';

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    environment = prod;
    break;
  default:
    environment = def;
}

export { environment, version };
