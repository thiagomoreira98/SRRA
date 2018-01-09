function verificarDados(req) {
    let response = new global.responseScope(406);

    response
        .field(req.body.nome, 'Nome').isNotNull()
        .field(req.body.status, 'Status').isNotNull()
        .field(req.body.tipoRecurso, 'Tipo de Recurso').isNotNull()
        .field(req.body.descricao, 'Descrição').isNotNull();

    if (!response.isSuccess) {
        req.errors = response.get();
        return false;
    }

    return true;
}

module.exports = verificarDados;