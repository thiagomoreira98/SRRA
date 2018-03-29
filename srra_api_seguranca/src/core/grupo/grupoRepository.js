const config = require('../../../config/config'),
    pg = require('smn-pg')(config.pg);

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar,
    selecionarDropdown
}

const procedures = {
    selecionar: 'seguranca.selecionarGrupo',
    buscar: 'seguranca.buscarGrupo',
    inserir: 'seguranca.inserirGrupo',
    alterar: 'seguranca.alterarGrupo',
    deletar: 'seguranca.deletarGrupo',
    selecionarDropdown: 'seguranca.selecionarGrupoDropdown',
}

async function selecionar(filtro) {
    return await pg.request()
        .input('pNome', filtro.nome == '' ? null : filtro.nome)
        .input('pPagina', filtro.pagina || 1)
        .input('pQuantidade', filtro.quantidade || 10)
        .asyncExecuteOne(procedures.selecionar);
}

async function buscar(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecuteOne(procedures.buscar);
}

async function inserir(grupo, idUsuario) {
    await pg.request()
        .input('pNome', grupo.nome)
        .input('pFuncionalidades', JSON.stringify(grupo.funcionalidades))
        .input('pDataCadastro', grupo.dataCadastro)
        .input('pIdUsuarioCadastro', idUsuario)
        .asyncExecute(procedures.inserir);
}

async function alterar(id, grupo, idUsuario) {
    await pg.request()
        .input('pId', id)
        .input('pNome', grupo.nome)
        .input('pFuncionalidades', JSON.stringify(grupo.funcionalidades))
        .input('pDataAlteracao', grupo.dataAlteracao)
        .input('pIdUsuarioAlteracao', idUsuario)
        .asyncExecute(procedures.alterar);
}

async function deletar(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecute(procedures.deletar);
}

async function selecionarDropdown(id) {
    return await pg.request()
        .asyncExecute(procedures.selecionarDropdown);
}