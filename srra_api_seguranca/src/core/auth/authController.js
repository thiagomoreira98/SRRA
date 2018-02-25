const repositorio = require('./authRepository'),
    crypto = require('../../helpers/encrypt'),
    token = require('../../helpers/token'),
    randomColor = require('../../helpers/color');

module.exports = {
    buscarDadosUsuario,
    login,
    refazerLogin
}

async function buscarDadosUsuario(req, res) {
    let retorno = await repositorio.buscarDadosUsuario(req.body.email);

    if (!retorno)
        return res.error(404, 'Usuario não encontrado.');

    res.ok(retorno);
}

async function login(req, res) {
    req.body.senha = await crypto.encrypt(req.body.senha);
    let retorno = await repositorio.login(req.body);

    if (!retorno)
        return res.error(404, 'Senha inválida.');

    retorno.usuario.cor = await randomColor(Math.floor(1 + Math.random() * 9));
    retorno.token = await crypto.gerarToken(retorno.usuario, req.body.senha);
    res.ok(retorno);
}

async function refazerLogin(req, res) {
    let retorno = await token(req);
    retorno.usuario.cor = await randomColor(Math.floor(1 + Math.random() * 9));
    res.ok(retorno);
}