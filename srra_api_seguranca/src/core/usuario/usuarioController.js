const repository = require('./usuarioRepository'),
    scope = require('./usuarioScope'),
    crypto = require('../../helpers/encrypt'),
    moment = require('moment');

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}

async function selecionar(req, res) {
    let retorno = await repository.selecionar(req.query);
    res.ok(retorno);
}

async function buscar(req, res) {
    let retorno = await repository.buscar(req.params.id);
    retorno.senha = await crypto.decrypt(retorno.senha);
    res.ok(retorno);
}

async function inserir(req, res) {
    if (!scope(req))
        return res.error(406, req.errors.errorMessages[0]);

    req.body.senha = await crypto.encrypt(req.body.senha);
    req.body.dataCadastro = moment().locale('pt-br').format();
    await repository.inserir(req.body, req.user.id);
    res.ok({ message: 'Salvo com Sucesso.' });
}

async function alterar(req, res) {
    if (!scope(req))
        return res.error(406, req.errors.errorMessages[0]);

    req.body.senha = await crypto.encrypt(req.body.senha);
    req.body.dataAlteracao = moment().locale('pt-br').format();
    await repository.alterar(req.params.id, req.body, req.user.id);
    res.ok({ message: 'Salvo com Sucesso.' });
}

async function deletar(req, res) {
    await repository.deletar(req.params.id);
    res.ok({ message: 'Removido com Sucesso.' });
}