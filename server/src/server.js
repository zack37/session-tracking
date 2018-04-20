import 'source-map-support';

import { cyan, green } from 'chalk';

import { Server } from 'hapi';
import pkg from '../package';
import registerPlugins from './plugins';
import { getPublicKey } from './lib/jwt';
import authManager, { Auth } from './api/auth/auth-manager';
import { Client } from './api/clients/client-manager';
import { Payment } from './api/payments/payments-manager';
import { Session } from './api/sessions/session-manager';
import { Trainer } from './api/trainers/trainer-manager';

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
  const models = [Auth, Trainer, Client, Payment, Session]
  for(const model in models) {
    await model.sync();
  }
}

server.connection({
  port: ~~process.env.PORT || 3000,
  labels: ['session-tracking'],
  host: process.env.HOST || 'localhost',
});

async function registerAuth() {
  async function validateFunc(token, request, callback) {
    const exists = await authManager.count(authManager.Auth, {
      email: token.email,
    });

    return callback(null, exists);
  }
  const key = await getPublicKey();
  server.auth.strategy('jwt', 'jwt', {
    key,
    validateFunc,
    verifyOptions: { algorithms: ['RS256'] },
  });

  server.auth.default('jwt');
}

async function bootstrap() {
  try {
    const startTime = process.hrtime();

    await registerPlugins(server);
    await registerAuth();
    await server.initialize();

    if (process.env.NODE_ENV !== 'test') {
      await sync();
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
