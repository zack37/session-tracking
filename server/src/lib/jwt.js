import path from 'path';
import { readFile } from 'fs';
import { promisify } from 'util';
import { sign } from 'jsonwebtoken';

const readFileAsync = promisify(readFile);
const signAsync = promisify(sign);

export async function createToken(payload) {
  const privateKeyPath = path.join(process.env.PWD, 'private.pem');
  const key = await readFileAsync(privateKeyPath);
  const token = await signAsync(
    payload,

    { key, passphrase: 'password' },
    {
      algorithm: 'RS256',
      expiresIn: '1h',
      issuer: 'session-tracker',
    },
  );
  return token;
}

export function getPublicKey() {
  return readFileAsync(path.join(process.env.PWD, 'public.pem'));
}
