function verificarDados(req) {
    let response = new global.responseScope(406);

    response
        .field(req.body.matricula, 'Matricula').isNotNull()
        .field(req.body.cpf, 'CPF').isNotNull()//.isCpf()
        .field(req.body.nome, 'Nome').isNotNull()
        .field(req.body.email, 'Email').isNotNull()
        .field(req.body.senha, 'Senha').isNotNull()
        .field(req.body.funcao, 'Função').isNotNull();

    if (!response.isSuccess) {
        req.errors = response.get();
        return false;
    }

    return true;
}

module.exports = verificarDados;