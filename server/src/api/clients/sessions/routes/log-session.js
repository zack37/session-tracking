import { insert, withConnection } from '../session-manager';

export default {
  method: 'POST',
  path: '/clients/{id}/sessions',
  handler: async (req, reply) => {
    const response = await withConnection(async db => {
      return await insert(db, req.params.id, req.payload);
    });

    reply.withEnvelope({});
  }
};
