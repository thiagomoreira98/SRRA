const repository = require('./ocorrenciaRepository');
const scope = require('./ocorrenciaScope');

async function selecionar(req, res) {
    let retorno = await repository.selecionar(req.query);
    res.ok(retorno);
}

async function buscar(req, res) {
    let retorno = await repository.buscar(req.params.id);
    res.ok(retorno);
}

async function inserir(req, res) {
    if (!scope.inserir(req))
        return res.error(406, req.errors.errorMessages[0]);

    await repository.inserir(req.body);
    res.ok({ message: 'Salvo com Sucesso.' });
}

async function alterar(req, res) {
    if (!scope(req))
        return res.error(406, req.errors.errorMessages[0]);

    await repository.alterar(req.params.id, req.body);
    res.ok({ message: 'Salvo com Sucesso.' });
}

async function selecionarStatus(req, res) {
    let retorno = await repository.selecionarStatus();
    res.ok(retorno);
}

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    selecionarStatus
}