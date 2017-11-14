import { Payment, query } from '../payments-manager';

export default {
  method: 'GET',
  path: '/clients/{id}/payments',
  handler: async (req, reply) => {
    const clientId = req.params.id;

    const response = await query(Payment, { clientId });

    reply.withEnvelope({ _id: clientId, paymentLog: response });
  },
};
