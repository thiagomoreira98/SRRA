const repository = require('./grupoRepository'),
    service = require('./grupoService'),
    scope = require('./grupoScope'),
    moment = require('moment');

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar,
    selecionarDropdown
}

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

    service.gerenciarFuncionalidades(req.body.funcionalidades);
    req.body.dataCadastro = moment().locale('pt-br').format();
    await repository.inserir(req.body, req.user.id);
    res.ok({ message: 'Cadastrado com sucesso.' });
}

async function alterar(req, res) {
    if (!scope(req))
        return res.error(406, req.errors.errorMessages[0]);

    service.gerenciarFuncionalidades(req.body.funcionalidades);
    req.body.dataAlteracao = moment().locale('pt-br').format();
    await repository.alterar(req.params.id, req.body, req.user.id);
    res.ok({ message: 'Alterado com sucesso.' });
}

async function deletar(req, res) {
    await repository.deletar(req.params.id);
    res.ok({ message: 'Removido com sucesso.' });
}

async function selecionarDropdown(req, res) {
    let retorno = await repository.selecionarDropdown();
    res.ok(retorno);
}