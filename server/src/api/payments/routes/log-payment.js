import { Payment, insert } from '../payments-manager';

import { NO_CONTENT } from 'http-status-codes';
import { mutableFieldsStrict } from '../payments-schema';
import { updateBalance } from '../../clients/client-manager';

export default {
  method: 'POST',
  path: '/clients/{id}/payments',
  config: {
    validate: {
      payload: mutableFieldsStrict,
    },
  },
  handler: async (req, reply) => {
    const clientId = req.params.id;

    await insert(Payment, { ...req.payload, clientId });
    await updateBalance(clientId, req.payload.amount);

    reply.withEnvelope({}, { code: NO_CONTENT });
  },
};
