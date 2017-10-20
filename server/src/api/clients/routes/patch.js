import { update, withConnection } from '../client-manager';

import { mutableFields } from '../client-schema';

export default {
  method: 'PATCH',
  path: '/clients/{id}',
  config: {
    validate: {
      payload: mutableFields
    }
  },
  handler: async (req, reply) => {
    await withConnection(async db => {
      return await update(db, req.params.id, req.payload);
    });

    reply.withEnvelope();
  }
};
