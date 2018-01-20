function verificar(req) {
    let response = new global.responseScope(406);

    response
        .field(req.body.recurso, 'Recurso').isNotNull()
        .field(req.body.docente, 'Docente').isNotNull()
        .field(req.body.data, 'Data').isNotNull()
        .field(req.body.detalhes, 'Detalhes').isNotNull();

    if (!response.isSuccess) {
        req.errors = response.get();
        return false;
    }

    return true;
}

module.exports = verificar;