const repository = require('./funcionalidadeRepository');

module.exports = {
    selecionar,
}

async function selecionar(req, res) {
    let retorno = await repository.selecionar();
    res.ok(retorno);
}