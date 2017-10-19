import { byId, withConnection } from '../session-manager';

export default {
  method: 'GET',
  path: '/clients/{id}/sessions',
  handler: async (req, reply) => {
    const response = await withConnection(async db => {
      return await byId(db, req.params.id);
    });

    reply.withEnvelope(response);
  },
};
