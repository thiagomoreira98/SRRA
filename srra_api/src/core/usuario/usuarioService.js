const crypto = require('../../helpers/encrypt/encrypt');

async function criptografarSenha(senha) {
    return crypto.encrypt(senha);
}

async function descriptografarSenha(token) {
    return crypto.decrypt(token);
}

module.exports = {
    criptografarSenha,
    descriptografarSenha
}