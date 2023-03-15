import crypto from 'crypto-js';

const SECRET_KEY = 'ThWmZq3t6w9z$C&F';

export const encryptWithAES = (text: string) => {
  return crypto.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptWithAES = (ciphertext: string) => {
  const bytes = crypto.AES.decrypt(ciphertext, SECRET_KEY);
  const originalText = bytes.toString(crypto.enc.Utf8); // output: '암호화할 값'
  return originalText;
}
