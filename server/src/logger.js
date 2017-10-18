import debug from 'debug';
import { name } from '../package';

export default (module) => ({
  debug: debug(`${name}:${module}`),
  log: console.log.bind(console, module),
  error: console.error.bind(console, module)
});
