import 'source-map-support';

import { cyan, green } from 'chalk';

import { Server } from 'hapi';
import pkg from '../package';
import registerPlugins from './plugins';
import { Client } from './api/clients/client-manager';
import { Session } from './api/sessions/session-manager';
import { Payment } from './api/payments/payments-manager';

const server = new Server({
  connections: {
    router: {
      stripTrailingSlash: true,
    },
    routes: {
      cors: true,
      validate: {
        options: {
          abortEarly: false,
        },
      },
    },
  },
});

async function sync() {
  await Client.sync();
  await Session.sync();
  await Payment.sync();
}

server.connection({
  port: ~~process.env.PORT || 3000,
  labels: ['session-tracking'],
  host: process.env.HOST || 'localhost',
});

async function bootstrap() {
  try {
    const startTime = process.hrtime();

    await registerPlugins(server);
    await server.initialize();
    await sync();

    if (process.env.NODE_ENV !== 'test') {
      await server.start();
      server.log(
        'info',
        `Starting ${green(pkg.name)} at ${cyan(server.info.uri)}`
      );
    }

    const [s, ns] = process.hrtime(startTime);
    const [sms, nms] = [s * 1e3, ns / 1e6];

    server.log('debug', `Server took ${sms + nms}ms to start up`);

    return server;
  } catch (err) {
    //eslint-disable-next-line no-console
    console.error(err);

    process.exit(1);
  }
}

export default bootstrap();
