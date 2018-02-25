const config = require('../../../config/config'),
    pg = require('smn-pg')(config.pg);

const procedures = {
    selecionar: 'public.selecionarRecurso',
    buscar: 'public.buscarRecurso',
    inserir: 'public.inserirRecurso',
    alterar: 'public.alterarRecurso',
    deletar: 'public.deletarRecurso'
}

async function selecionar(filtro) {
    return await pg.request()
        .input('pNome', filtro.nome)
        .input('pCodigoPatrimonio', filtro.codigoPatrimonio)
        .input('pIdStatusRecurso', filtro.status == 'Todos' ? null : filtro.status)
        .input('pIdTipoRecurso', filtro.tipo == 'Todos' ? null : filtro.tipo)
        .input('pPagina', filtro.pagina)
        .input('pQuantidade', filtro.quantidade)
        .asyncExecuteOne(procedures.selecionar);
}

async function buscar(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecuteOne(procedures.buscar);
}

async function inserir(recurso) {
    await pg.request()
        .input('pcodigoPatrimonio', recurso.codigoPatrimonio)
        .input('pNome', recurso.nome)
        .input('pDescricao', recurso.descricao)
        .input('pIdStatusRecurso', recurso.status)
        .input('pIdTipoRecurso', recurso.tipo)
        .input('pMotivo', recurso.motivo)
        .input('pDataMotivo', recurso.dataMotivo)
        .asyncExecute(procedures.inserir);
}

async function alterar(id, recurso) {
    await pg.request()
        .input('pId', id)
        .input('pcodigoPatrimonio', recurso.codigoPatrimonio)
        .input('pNome', recurso.nome)
        .input('pDescricao', recurso.descricao)
        .input('pIdStatusRecurso', recurso.status)
        .input('pIdTipoRecurso', recurso.tipo)
        .input('pMotivo', recurso.motivo)
        .input('pDataMotivo', recurso.dataMotivo)
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