const pg = require('smn-pg')(global.config.pgSQL);

module.exports = {
    buscarDadosUsuario,
    login,
    refazerLogin
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

async function refazerLogin() {
    
}