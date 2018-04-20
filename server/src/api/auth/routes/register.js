import authManager from '../auth-manager';
import bcrypt from 'bcrypt';
import { mutableFieldsStrict } from '../auth-schema';
import { createToken } from '../../../lib/jwt';

export default {
  method: 'POST',
  path: '/auth/register',
  config: {
    validate: {
      payload: mutableFieldsStrict,
    },
  },
  handler: async (req, reply) => {
    const { email, password } = req.payload;
    const hash = await bcrypt.hash(password, 10);
    await authManager.insert({ email, password: hash });
    const token = await createToken({ email });
    reply({ token });
  }
};
