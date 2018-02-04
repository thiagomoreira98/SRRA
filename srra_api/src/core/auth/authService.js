const crypto = require('../../helpers/encrypt/encrypt');

async function criptografarSenha(senha) {
    return crypto.encrypt(senha);
}

module.exports = {
    criptografarSenha
}