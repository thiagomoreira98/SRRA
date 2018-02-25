function verificar(req) {
    let response = new global.responseScope(406);

    response
        .field(req.body.nome, 'Nome').isNotNull()

    if (!response.isSuccess) {
        req.errors = response.get();
        return false;
    }

    return true;
}

module.exports = verificar;