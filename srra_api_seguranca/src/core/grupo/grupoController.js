const repository = require('./grupoRepository'),
    scope = require('./grupoScope');

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

    await repository.inserir(req.body);
    res.ok({ message: 'Cadastrado com sucesso.' });
}

async function alterar(req, res) {
    if (!scope(req))
        return res.error(406, req.errors.errorMessages[0]);

    await repository.alterar(req.params.id, req.body);
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