import { withConnection as clientConnection, update } from '../../client-manager';
import { insert, withConnection } from '../payments-manager';

import { mutableFieldsStrict } from '../payments-schema';

export default {
  method: 'POST',
  path: '/clients/{id}/payments',
  config: {
    validate: {
      payload: mutableFieldsStrict,
    },
  },
  handler: async (req, reply) => {
    await withConnection(async db => {
      await insert(db, req.params.id, req.payload);
    });
    await clientConnection(async db => {
      await update(db, req.params.id, {
        $inc: { balance: req.payload.amount },
      });
    });

    reply.withEnvelope({});
  },
};
