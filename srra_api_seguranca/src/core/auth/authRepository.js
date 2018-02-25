const config = require('../../../config/config'),
    pg = require('smn-pg')(config.pg);

module.exports = {
    buscarDadosUsuario,
    login
}

const procedures = {
    buscarDadosUsuario: 'seguranca.buscarDadosUsuario',
    login: 'seguranca.fazerLogin'
}

async function buscarDadosUsuario(usuario) {
    return await pg.request()
        .input('pEmail', usuario)
        .asyncExecuteOne(procedures.buscarDadosUsuario);
}

async function login(login) {
    return await pg.request()
        .input('pId', login.id)
        .input('pSenha', login.senha)
        .asyncExecuteOne(procedures.login);
}