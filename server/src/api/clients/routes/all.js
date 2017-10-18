import { count, query, withConnection } from '../client-manager';

import boom from 'boom';
import envelopeSchema from '../../../schemas/envelope-schema';
import joi from 'joi';
import { response as responseSchema } from '../client-schema';

export default {
  method: 'GET',
  path: '/clients',
  config: {
    validate: {
      query: joi
        .object({
          limit: joi
            .number()
            .positive()
            .integer(),
          page: joi
            .number()
            .positive()
            .integer(),
        })
        .unknown(true),
    },
    response: {
      schema: envelopeSchema(joi.array().items(responseSchema)),
    },
  },
  handler: async (req, reply) => {
    const queryParams = req.query;
    const { documentCount, response } = await withConnection(async db => {
      const documentCount = await count(db, queryParams);
      const response = await query(db, queryParams);

      return { documentCount, response };
    });

    reply.withEnvelope(response, { withPaging: true, count: documentCount });
  },
};
