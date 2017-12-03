const repository = require('./docenteRepository');
const scope = require('./docenteScope');

async function selecionar(req, res) {
    let retorno = await repository.selecionar();
    res.status(200).json(retorno);
}

async function buscar(req, res) {
    let retorno = await repository.buscar(req.params.id);
    res.status(200).json(retorno);
}

async function inserir(req, res) {
    if (!scope(req))
        return res.status(406).json(req.errors);

    await repository.inserir(req.body);
    res.status(200).send('Cadastrado com Sucesso!');
}

async function alterar(req, res) {
    if (!scope(req))
        return res.status(406).json(req.errors);

    await repository.alterar(req.params.id, req.body);
    res.status(200).send('Alterado com Sucesso!');
}

async function deletar(req, res) {
    await repository.deletar(req.params.id);
    res.status(200).send('Deletado com Sucesso!');
}

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}