const crypto = require('./encrypt'),
    auth = require('../core/auth/authService')

module.exports = async (req) => {

    if (!req.headers.authentication)
        throw { statusCode: 406, message: 'Token não fornecido.' };


    let token = await crypto.decrypt(req.headers.authentication);
    token = token.split(',');

    let user = {
        id: token[0],
        senha: token[3]
    }

    let retorno = await auth(req.headers.authentication);

    req.user = retorno;
    req.user.id = retorno.usuario.id;
    req.user.idGrupo = retorno.usuario.idGrupo;
    req.user.nome = retorno.usuario.nome;
    return req.user;
}