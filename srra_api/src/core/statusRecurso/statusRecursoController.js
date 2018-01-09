const repository = require('./statusRecursoRepository');

async function selecionar(req, res) {
    let retorno = await repository.selecionar();
    res.ok(200, retorno);
}

module.exports = {
    selecionar
}