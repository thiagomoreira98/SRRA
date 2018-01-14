const repository = require('./recursoRepository');
const scope = require('./recursoScope');

async function selecionar(req, res) {
    let retorno = await repository.selecionar(req.query);
    res.ok(200, retorno);
}

async function buscar(req, res) {
    let retorno = await repository.buscar(req.params.id);
    res.ok(200, retorno);
}

async function inserir(req, res) {
    if (!scope(req))
        return res.error(406, req.errors.errorMessages[0]);

    await repository.inserir(req.body);
    res.ok(200, { message: 'Salvo com Sucesso.' });
}

async function alterar(req, res) {
    if (!scope(req))
        return res.error(406, req.errors.errorMessages[0]);

    await repository.alterar(req.params.id, req.body);
    res.ok(200, { message: 'Salvo com Sucesso.' });
}

async function deletar(req, res) {
    await repository.deletar(req.params.id);
    res.ok(200, { message: 'Removido com Sucesso.' });
}

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}