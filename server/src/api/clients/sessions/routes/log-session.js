import { insert, withConnection } from '../session-manager';

import { mutableFieldsStrict } from '../session-schema';

export default {
  method: 'POST',
  path: '/clients/{id}/sessions',
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
