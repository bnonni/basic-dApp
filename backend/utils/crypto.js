const { createCipheriv, createDecipheriv, createHash } = require('crypto');
const key = process.env.ENCRYPT_KEY;
const initVector = process.env.INIT_VECTOR;

const encryptions = {

    cipherEncrypt: (algorithm, data) => {
        const cipher = createCipheriv(algorithm, key, initVector);
        let encryptedData = cipher.update(data, 'utf-8', 'hex');
        encryptedData += cipher.final('hex');
        return encryptedData;
    },

    cipherDecrypt: (algorithm, encryptedData) => {
        const decipher = createDecipheriv(algorithm, key, initVector);
        let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
        decryptedData += decipher.final('utf-8');
        return decryptedData;
    },

    sha256: (data) => {
        const hash = createHash('sha256');
        return hash.update(data).digest('hex');
    },

    rot13: (data) => {
      return data
          .split('')
          .map(i => i.charCodeAt(0))
          .map(d => d >= 65 && d <= 90 ? d + 13 > 90 ? d - 13 : d + 13 : d)
          .map(d => d >= 97 && d <= 122 ? d + 13 > 122 ? d - 13 : d + 13 : d)
          .map(d => String.fromCharCode(d))
          .reduce((a, c) => a + c, '');
     }
};

module.exports = { encryptions };
