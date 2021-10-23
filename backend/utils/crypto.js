const { createCipheriv, createHash } = require('crypto');

const cipher = async (data) => {
    const cipher = createCipheriv('aes-256-cbc', process.env.ENCRYPT_KEY, process.env.INIT_VECTOR);
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
};

const sha256 = async (data) => {
    const hash = createHash('sha256');
    return hash.update(data).digest('hex');
};

const rot13 = async (data) => {
    return data
        .split('')
        .map((i) => i.charCodeAt(0))
        .map((d) => (d >= 65 && d <= 90 ? (d + 13 > 90 ? d - 13 : d + 13) : d))
        .map((d) =>
            d >= 97 && d <= 122 ? (d + 13 > 122 ? d - 13 : d + 13) : d
        )
        .map((d) => String.fromCharCode(d))
        .reduce((a, c) => a + c, '');
};

module.exports = { cipher, sha256, rot13 };
