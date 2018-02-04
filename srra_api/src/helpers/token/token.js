const blowfish = require('../encrypt/encrypt');

module.exports = (req) => {

    if (!req.headers.token)
        return res.error(406, 'Sem acesso para essa funcionalidade');

    let token = blowfish.decrypt(req.headers.token);
    token = token.split(',');

    let user = {
        login: token[0].trim(),
        senha: token[1].trim()
    };

    req.user = user;
    return null;
}