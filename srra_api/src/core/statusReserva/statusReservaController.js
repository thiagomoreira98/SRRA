const repository = require('./statusReservaRepository');

async function selecionar(req, res) {
    let retorno = await repository.selecionar();
    res.ok(retorno);
}

module.exports = {
    selecionar
}