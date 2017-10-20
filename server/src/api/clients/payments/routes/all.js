import { byId, withConnection } from '../payments-manager';

export default {
  method: 'GET',
  path: '/clients/{id}/payments',
  handler: async (req, reply) => {
    const response = await withConnection(async db => {
      return await byId(db, req.params.id);
    });

    reply.withEnvelope(response);
  },
};
