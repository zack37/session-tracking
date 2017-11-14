import { Session, query } from '../session-manager';

export default {
  method: 'GET',
  path: '/clients/{id}/sessions',
  handler: async (req, reply) => {
    const clientId = req.params.id;

    const response = await query(Session, { clientId });

    reply.withEnvelope({ _id: clientId, sessionLog: response });
  },
};
