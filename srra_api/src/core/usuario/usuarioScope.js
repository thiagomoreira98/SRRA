function verificar(req) {
    let response = new global.responseScope(406);

    response
        .field(req.body.matricula, 'Matricula').isNotNull()
        .field(req.body.cpf, 'CPF').isCpf()
        .field(req.body.nome, 'Nome').isNotNull()
        .field(req.body.email, 'Email').isNotNull()
        .field(req.body.senha, 'Senha').isNotNull()
        .field(req.body.grupo, 'Grupo').isNotNull();

    if (!response.isSuccess) {
        req.errors = response.get();
        return false;
    }

    return true;
}

module.exports = verificar;