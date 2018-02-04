const repository = require('./grupoRepository');

async function selecionar(req, res) {
    let retorno = await repository.selecionar();
    res.ok(retorno);
}

module.exports = {
    selecionar
}