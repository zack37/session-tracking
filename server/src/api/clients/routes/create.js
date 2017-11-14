import { Client, insert } from '../client-manager';

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
    const response = await insert(Client, { ...req.payload, balance: 0 });

    reply.withEnvelope(response, { code: CREATED });
  },
};
