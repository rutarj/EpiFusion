import crypto from 'crypto';
import 'dotenv/config';

const ivLength = 12; 
const keyHex   = process.env.AES_KEY;

console.log('[AES_KEY length]', keyHex?.length, 'value:', JSON.stringify(keyHex));


if (!keyHex || keyHex.length !== 64) {
  throw new Error('AES_KEY must be 64-char hex in .env');
}

const key = Buffer.from(keyHex, 'hex');

export function encryptBuffer(buffer) {
  const iv     = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  const enc    = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const tag    = cipher.getAuthTag();

  return Buffer.concat([iv, tag, enc]);
}


export function decryptBuffer(encBuffer) {
  const iv   = encBuffer.subarray(0, ivLength);
  const tag  = encBuffer.subarray(ivLength, ivLength + 16);
  const data = encBuffer.subarray(ivLength + 16);

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([decipher.update(data), decipher.final()]);
}
