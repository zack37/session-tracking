import { insert, withConnection } from '../client-manager';

import { CREATED } from 'http-status-codes';
import joi from 'joi';
import { mutableFieldsStrict } from '../client-schema';

export default {
  method: 'POST',
  path: '/clients',
  config: {
    validate: {
      payload: mutableFieldsStrict
    }
  },
  handler: async (req, reply) => {
    const response = await withConnection(async db => {
      return await insert(db, req.payload);
    });

    reply(response).code(CREATED);
  }
};
