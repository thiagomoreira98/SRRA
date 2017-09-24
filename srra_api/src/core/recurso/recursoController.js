const repository = require('./recursoRepository');
const scope = require('./recursoScope');

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}

async function selecionar(req, res) {
    let response = await repository.selecionar();
    res.finish(new global.responseOk(200, response))
}

async function buscar(req, res) {
    let response = await repository.buscar(req.params.id);
    res.finish(new global.responseOk(200, response))
}

async function inserir(req, res) {
    // if(!scope.verificar)
    //     return res.finish(req.errors);

    await repository.inserir(req.body);
    res.finish(new global.responseOk(200))
}

async function alterar(req, res) {
    // if(!scope.verificar)
    // return res.finish(req.errors);

    await repository.alterar(req.params.id, req.body);
    res.finish(new global.responseOk(200));
}

async function deletar(req, res) {
    await repository.deletar(req.params.id);
    res.finish(new global.responseOk(200));
}