import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const ROUNDS = 10;
const SECRET = process.env.CINNAMON_CRYPT_SECRET || '';
const IV_KEY = process.env.CINNAMON_CRYPT_IV_KEY || '';

export const hash = (value) => {
  return bcrypt.hashSync(value, ROUNDS);
};

export const compare = (value, hashedValue) => {
  return bcrypt.compareSync(value, hashedValue);
};

export const encrypt = (value) => {
  const iv = Buffer.from(IV_KEY, 'hex').toString('hex').slice(0, 16);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(SECRET, 'hex'),
    iv
  );

  let encrypted = cipher.update(value);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv}:${encrypted.toString('hex')}`;
};

export const decrypt = (value) => {
  const parts = value.includes(':') ? value.split(':') : [];
  const iv = Buffer.from(parts.shift() || '', 'binary');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(SECRET, 'hex'),
    iv
  );

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
