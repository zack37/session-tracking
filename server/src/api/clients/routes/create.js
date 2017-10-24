import { insert, withConnection } from '../client-manager';
import {
  create as paymentCreate,
  withConnection as paymentsConnection,
} from '../payments/payments-manager';
import {
  create as sessionCreate,
  withConnection as sessionsConnection,
} from '../sessions/session-manager';

import { CREATED } from 'http-status-codes';
import { mutableFieldsStrict } from '../client-schema';

export default {
  method: 'POST',
  path: '/clients',
  config: {
    validate: {
      payload: mutableFieldsStrict,
    },
  },
  handler: async (req, reply) => {
    const response = await withConnection(async db => {
      return await insert(db, { ...req.payload, balance: 0 });
    });

    await sessionsConnection(async db => {
      return await sessionCreate(db, response._id);
    });

    await paymentsConnection(async db => {
      return await paymentCreate(db, response._id);
    });

    reply.withEnvelope(response);
  },
};
