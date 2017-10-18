import { join, resolve } from 'path';

import hapiRouter from 'hapi-router';

export default {
  register: hapiRouter,
  options: {
    routes: 'api/**/routes/*.js',
    cwd: resolve(join(__dirname, '..')),
  },
};
