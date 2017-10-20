import { insert, withConnection } from '../payments-manager';

import { mutableFieldsStrict } from '../payments-schema';

export default {
  method: 'POST',
  path: '/clients/{id}/payments',
  config: {
    validate: {
      payload: mutableFieldsStrict
    }
  },
  handler: async (req, reply) => {
    await withConnection(async db => {
      return await insert(db, req.params.id, req.payload);
    });

    reply.withEnvelope({});
  }
};
