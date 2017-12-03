function verificarDados(req) {
    let response = new global.responseScope(406);

    response
        .field(req.body.recurso, 'Recurso').isNotNull()
        .field(req.body.data, 'Recurso').isNotNull()
        .field(req.body.detalhes, 'Recurso').isNotNull()
        .field(req.body.docente, 'Docente').isNotNull();

    if (!response.isSuccess) {
        req.errors = response.get();
        return false;
    }

    return true;
}

module.exports = verificarDados;