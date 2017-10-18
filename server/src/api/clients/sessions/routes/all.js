import { byId, withConnection } from '../session-manager';

import joi from 'joi';

export default {
  method: 'GET',
  path: '/clients/{id}/sessions',
  handler: async (req, reply) => {
    const queryParams = req.query;
    const response = await withConnection(async db => {
      return await byId(db, req.params.id);
    });

    reply.withEnvelope(response);
  },
};
