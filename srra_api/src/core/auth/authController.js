const repositorio = require('./authRepository'),
    service = require('./authService');

module.exports = {
    buscarDadosUsuario,
    login,
    refazerLogin
}

async function buscarDadosUsuario(req, res) {
    let retorno = await repositorio.buscarDadosUsuario(req.params.usuario);

    if(!retorno)
        return res.error(404, 'Usuario não encontrado.');

    res.ok(retorno);
}

async function login(req, res) {
    req.params.senha = await service.criptografarSenha(req.params.senha);
    let retorno = await repositorio.login(req.params);

    if(!retorno)
        return res.error(404, 'Senha inválida.');

    res.ok(retorno);
}

async function refazerLogin(req, res) {
    
}