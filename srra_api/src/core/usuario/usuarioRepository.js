const pg = require('smn-pg')(global.config.pgSQL);

const procedures = {
    selecionar: 'seguranca.selecionarUsuario',
    buscar: 'seguranca.buscarUsuario',
    inserir: 'seguranca.inserirUsuario',
    alterar: 'seguranca.alterarUsuario',
    deletar: 'seguranca.deletarUsuario'
}

async function selecionar(filtro) {
    return await pg.request()
        .input('pNome', filtro.nome)
        .input('pMatricula', filtro.matricula)
        .input('pCpf', filtro.cpf)
        .input('pIdGrupo', filtro.grupo == 'Todos' ? null : filtro.grupo)
        .input('pPagina', parseInt(filtro.pagina))
        .input('pQuantidade', parseInt(filtro.quantidade))
        .asyncExecuteOne(procedures.selecionar);
}

async function buscar(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecuteOne(procedures.buscar);
}

async function inserir(usuario) {
    await pg.request()
        .input('pNome', usuario.nome)
        .input('pCpf', usuario.cpf)
        .input('pMatricula', usuario.matricula)
        .input('pEmail', usuario.email)
        .input('pSenha', usuario.senha)
        .input('pIdGrupo', usuario.grupo)
        .asyncExecute(procedures.inserir);
}

async function alterar(id, usuario) {
    await pg.request()
        .input('pId', id)
        .input('pNome', usuario.nome)
        .input('pCpf', usuario.cpf)
        .input('pMatricula', usuario.matricula)
        .input('pEmail', usuario.email)
        .input('pSenha', usuario.senha)
        .input('pIdFuncao', usuario.funcao)
        .asyncExecute(procedures.alterar);
}

async function deletar(id) {
    await pg.request()
        .input('pId', id)
        .asyncExecute(procedures.deletar);
}

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}