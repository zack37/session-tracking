import { Client, byId } from '../client-manager';

import idSchema from '../../../schemas/id-schema';

export default {
  method: 'GET',
  path: '/clients/{id}',
  config: {
    validate: {
      params: {
        id: idSchema,
      },
    },
  },
  handler: async (req, reply) => {
    const id = req.params.id;

    const response = await byId(Client, id);

    reply.withEnvelope(response);
  },
};
