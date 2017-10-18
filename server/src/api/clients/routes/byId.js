import { byId, withConnection } from '../client-manager';

import boom from 'boom';
import envelopeSchema from '../../../schemas/envelope-schema';
import idSchema from '../../../schemas/id-schema';
import joi from 'joi';
import { response as responseSchema } from '../client-schema';

export default {
  method: 'GET',
  path: '/clients/{id}',
  config: {
    validate: {
      params: {
        id: idSchema,
      },
    },
    response: {
      schema: envelopeSchema(responseSchema),
    },
  },
  handler: async (req, reply) => {
    const id = req.params.id;
    const response =  await withConnection(async db => {
      return await byId(db, id);
    });

    reply.withEnvelope(response);
  },
};
