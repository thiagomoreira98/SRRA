const crypto = require('crypto'),
    key = 'f@73c_5rr@',
    algorithm = 'aes256';

module.exports = {
    encrypt,
    decrypt
};

function encrypt(value) {
    let cipher = crypto.createCipher(algorithm, key);
    let crypted = cipher.update(value, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(token) {
    let decipher = crypto.createDecipher(algorithm, key)
    let dec = decipher.update(token, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}