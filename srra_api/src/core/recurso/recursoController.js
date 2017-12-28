const repository = require('./recursoRepository');
const scope = require('./recursoScope');

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
        return res.status(406).json({ message: req.errors.errorMessages[0] });

    await repository.inserir(req.body);
    res.status(200).json({ message: 'Salvo com Sucesso.' });
}

async function alterar(req, res) {
    if (!scope(req))
        return res.status(406).json({ message: req.errors.errorMessages[0] });

    await repository.alterar(req.params.id, req.body);
    res.status(200).json({ message: 'Salvo com Sucesso.' });
}

async function deletar(req, res) {
    await repository.deletar(req.params.id);
    res.status(200).json({ message: 'Removido com Sucesso.' });
}

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}