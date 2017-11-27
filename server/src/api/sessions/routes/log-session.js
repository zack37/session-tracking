import { Session, insert } from '../session-manager';

import { NO_CONTENT } from 'http-status-codes';
import { mutableFieldsStrict } from '../session-schema';
import { updateBalance } from '../../clients/client-manager';

export default {
  method: 'POST',
  path: '/clients/{id}/sessions',
  config: {
    validate: {
      payload: mutableFieldsStrict
    }
  },
  handler: async (req, reply) => {
    const clientId = req.params.id;

    await insert(Session, { ...req.payload, clientId });
    await updateBalance(clientId, -req.payload.amount);

    reply.withEnvelope({}, { code: NO_CONTENT });
  }
};
