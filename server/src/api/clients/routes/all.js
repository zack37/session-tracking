import { Client, count, query } from '../client-manager';

import envelopeSchema from '../../../schemas/envelope-schema';
import joi from 'joi';
import { response as responseSchema } from '../client-schema';

export default {
  method: 'GET',
  path: '/clients',
  config: {
    auth: false,
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
    // response: {
    //   schema: envelopeSchema(joi.array().items(responseSchema)),
    // },
  },
  handler: async (req, reply) => {
    const queryParams = req.query;

    // const { documentCount, response } = await withConnection(async db => {
    //   const documentCount = await count(db, queryParams);
    //   const response = await query(db, queryParams);

    //   return { documentCount, response };
    // });

    const documentCount = await count(Client, queryParams);
    const response = await query(Client, queryParams);

    reply.withEnvelope(response, { withPaging: true, count: documentCount });
  },
};
