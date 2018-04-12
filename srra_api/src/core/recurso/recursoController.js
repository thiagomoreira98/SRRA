const repository = require('./recursoRepository'),
    scope = require('./recursoScope'),
    moment = require('moment');

async function selecionar(req, res) {
    let retorno = await repository.selecionar(req.query);
    res.ok(retorno);
}

async function buscar(req, res) {
    let retorno = await repository.buscar(req.params.id);
    res.ok(retorno);
}

async function inserir(req, res) {
    if (!scope(req))
        return res.error(406, req.errors.errorMessages[0]);

    req.body.dataCadastro = moment().locale('pt-br').format();
    await repository.inserir(req.body, req.user.id);
    res.ok({ message: 'Salvo com Sucesso.' });
}

async function alterar(req, res) {
    if (!scope(req))
        return res.error(406, req.errors.errorMessages[0]);

    req.body.dataAlteracao = moment().locale('pt-br').format();
    await repository.alterar(req.params.id, req.body, req.user.id);
    res.ok({ message: 'Salvo com Sucesso.' });
}

async function deletar(req, res) {
    await repository.deletar(req.params.id);
    res.ok({ message: 'Removido com Sucesso.' });
}

async function selecionarStatus(req, res) {
    let retorno = await repository.selecionarStatus();
    res.ok(retorno);
}

async function selecionarTipo(req, res) {
    let retorno = await repository.selecionarTipo();
    res.ok(retorno);
}

async function selecionarRecursoDropdown(req, res) {
    let retorno = await repository.selecionarRecursoDropdown();
    res.ok(retorno);
}

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar,
    selecionarStatus,
    selecionarTipo,
    selecionarRecursoDropdown
}