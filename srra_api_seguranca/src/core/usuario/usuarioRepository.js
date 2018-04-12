const config = require('../../../config/config'),
    pg = require('smn-pg')(config.pg);

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar,
    selecionarUsuarioDropdown
}

const procedures = {
    selecionar: 'seguranca.selecionarUsuario',
    buscar: 'seguranca.buscarUsuario',
    inserir: 'seguranca.inserirUsuario',
    alterar: 'seguranca.alterarUsuario',
    deletar: 'seguranca.deletarUsuario',
    selecionarUsuarioDropdown: 'seguranca.selecionarUsuarioDropdown'
}

async function selecionar(filtro) {
    return await pg.request()
        .input('pNome', filtro.nome == '' ? null : filtro.nome)
        .input('pMatricula', filtro.matricula == '' ? null : filtro.matricula)
        .input('pCpf', filtro.cpf == '' ? null : filtro.cpf)
        .input('pEmail', filtro.email == '' ? null : filtro.email)
        .input('pIdGrupo', filtro.idGrupo == '' ? null : filtro.idGrupo)
        .input('pPagina', filtro.pagina)
        .input('pQuantidade', filtro.quantidade)
        .asyncExecuteOne(procedures.selecionar);
}

async function buscar(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecuteOne(procedures.buscar);
}

async function inserir(usuario, idUsuario) {
    await pg.request()
        .input('pNome', usuario.nome)
        .input('pCpf', usuario.cpf)
        .input('pMatricula', usuario.matricula)
        .input('pEmail', usuario.email)
        .input('pSenha', usuario.senha)
        .input('pIdGrupo', usuario.idGrupo)
        .input('pDataCadastro', usuario.dataCadastro)
        .input('pIdUsuarioCadastro', idUsuario)
        .asyncExecute(procedures.inserir);
}

async function alterar(id, usuario, idUsuario) {
    await pg.request()
        .input('pId', id)
        .input('pNome', usuario.nome)
        .input('pCpf', usuario.cpf)
        .input('pMatricula', usuario.matricula)
        .input('pEmail', usuario.email)
        .input('pSenha', usuario.senha)
        .input('pIdGrupo', usuario.idGrupo)
        .input('pDataAlteracao', usuario.dataAlteracao)
        .input('pIdUsuarioAlteracao', idUsuario)
        .asyncExecute(procedures.alterar);
}

async function deletar(id) {
    await pg.request()
        .input('pId', id)
        .asyncExecute(procedures.deletar);
}

async function selecionarUsuarioDropdown() {
    return await pg.request()
        .asyncExecute(procedures.selecionarUsuarioDropdown);
}
