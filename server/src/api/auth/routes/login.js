import bcrypt from 'bcrypt';
import authManager from '../auth-manager';
import { mutableFieldsStrict } from '../auth-schema';
import { UNAUTHORIZED } from 'http-status-codes';
import { createToken } from '../../../lib/jwt';

export default {
  method: 'POST',
  path: '/auth/login',
  config: {
    auth: false,
    validate: {
      payload: mutableFieldsStrict,
    },
  },
  handler: async (req, reply) => {
    const { email, password } = req.payload;
    const user = await authManager.findByEmail(email);

    if (!user) {
      reply(new Error('Username or password incorrect')).code(UNAUTHORIZED);
    }
    const passwordMatches = bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      reply(new Error('Username or password incorrect')).code(UNAUTHORIZED);
    }

    const token = await createToken({ email });
    reply({ token });
  },
};
