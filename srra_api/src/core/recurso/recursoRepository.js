const config = require('../../../config/config'),
    pg = require('smn-pg')(config.pg);

const procedures = {
    selecionar: 'principal.selecionarRecurso',
    buscar: 'principal.buscarRecurso',
    inserir: 'principal.inserirRecurso',
    alterar: 'principal.alterarRecurso',
    deletar: 'principal.deletarRecurso',
    selecionarStatus: 'principal.selecionarStatusRecurso',
    selecionarTipo: 'principal.selecionarTipoRecurso',
    selecionarRecursoDropdown: 'principal.selecionarRecursoDropdown'
}

async function selecionar(filtro) {
    return await pg.request()
        .input('pNome', filtro.nome == '' ? null : filtro.nome)
        .input('pCodigoPatrimonio', filtro.codigoPatrimonio)
        .input('pIdStatusRecurso', filtro.idStatus == '' ? null : filtro.idStatus)
        .input('pIdTipoRecurso', filtro.idTipo == '' ? null : filtro.idTipo)
        .input('pPagina', filtro.pagina || 1)
        .input('pQuantidade', filtro.quantidade || 10)
        .asyncExecuteOne(procedures.selecionar);
}

async function buscar(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecuteOne(procedures.buscar);
}

async function inserir(recurso, idUsuario) {
    await pg.request()
        .input('pNome', recurso.nome)
        .input('pCodigoPatrimonio', recurso.codigoPatrimonio)
        .input('pDescricao', recurso.descricao)
        .input('pIdStatusRecurso', recurso.idStatus)
        .input('pIdTipoRecurso', recurso.idTipo)
        .input('pMotivo', recurso.motivo)
        .input('pDataMotivo', recurso.dataMotivo)
        .input('pIdUsuarioCadastro', idUsuario)
        .input('pDataCadastro', recurso.dataCadastro)
        .asyncExecute(procedures.inserir);
}

async function alterar(id, recurso, idUsuario) {
    await pg.request()
        .input('pId', id)
        .input('pcodigoPatrimonio', recurso.codigoPatrimonio)
        .input('pNome', recurso.nome)
        .input('pDescricao', recurso.descricao)
        .input('pIdStatusRecurso', recurso.idStatus)
        .input('pIdTipoRecurso', recurso.idTipo)
        .input('pMotivo', recurso.motivo)
        .input('pDataMotivo', recurso.dataMotivo)
        .input('pIdUsuarioAlteracao', idUsuario)
        .input('pDataAlteracao', recurso.dataAlteracao)
        .asyncExecute(procedures.alterar);
}

async function deletar(id) {
    await pg.request()
        .input('pId', id)
        .asyncExecute(procedures.deletar);
}

async function selecionarStatus() {
    return await pg.request()
        .asyncExecute(procedures.selecionarStatus);
}

async function selecionarTipo() {
    return await pg.request()
        .asyncExecute(procedures.selecionarTipo);
}

async function selecionarRecursoDropdown() {
    return await pg.request()
        .asyncExecute(procedures.selecionarRecursoDropdown);
}

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar,
    selecionarStatus,
    selecionarTipo,
    selecionarRecursoDropdown
}