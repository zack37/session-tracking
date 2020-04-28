import { cyan, green } from 'chalk';
import { flatten, values } from 'lodash/fp';

import { loadAsync } from 'mod.js';

export default async function(server) {
  const filePlugins = await loadAsync(__dirname);
  const plugins = flatten([...values(filePlugins)]);
  try {
    await server.register(plugins, { routes: { prefix: '/session-tracker' } });
    const pluginNames = Object.keys(server.registrations).join(', ');
    server.log(
      'debug',
      green('Plugins successfully loaded: ') + cyan(pluginNames),
    );
  } catch (e) {
    console.error('Error while registering plugins', e);

    throw e;
  }
}
