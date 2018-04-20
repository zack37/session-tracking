import path from 'path';
import { readFile } from 'fs';
import { sign } from 'jsonwebtoken';
import { promisify } from 'util';

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
    }
  );
  return token;
}

export async function getPublicKey() {
  return await readFileAsync(path.join(process.env.PWD, 'public.pem'));
}
