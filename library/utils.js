const CryptoJS = require("crypto-js");

const SECRET_KEY = 'ThWmZq3t6w9z$C&F';

const decryptWithAES = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8); // output: '암호화할 값'
  return originalText;
}

module.exports = {
  decryptWithAES
};