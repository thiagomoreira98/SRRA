function verificarDados(req) {
    let response = new global.responseScope(406);

    response
        .field(req.body.codigoPatrimonio, 'Codigo do Patrimônio').isNotNull()
        .field(req.body.nome, 'Nome').isNotNull()
        .field(req.body.descricao, 'Descricao').isNotNull()
        .field(req.body.status, 'Status').isNotNull();

    if (req.body.status != 'Disponivel') {
        response
            .field(req.body.data, 'Data').isNotNull()
            .field(req.body.motivo, 'Motivo').isNotNull();
    }

    if (!response.isSuccess) {
        req.errors = response.get();
        return false;
    }

    return true;
}

module.exports = verificarDados;