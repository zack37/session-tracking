import debug from 'debug';
import { name } from '../package';

export default module => ({
  debug: debug(`${name}:${module}`),
  //eslint-disable-next-line no-console
  log: console.log.bind(console, module),
  //eslint-disable-next-line no-console
  error: console.error.bind(console, module),
});
