const config = require('../../../config/config'),
    pg = require('smn-pg')(config.pg);

const procedures = {
    selecionar: 'principal.selecionarOcorrencia',
    buscar: 'principal.buscarOcorrencia',
    inserir: 'principal.inserirOcorrencia',
    alterar: 'principal.alterarOcorrencia',
    selecionarStatus: 'principal.selecionarStatusOcorrencia'
}

async function selecionar(filtro) {
    return await pg.request()
        .input('pIdRecurso', filtro.recurso)
        .input('pIdDocente', filtro.docente)
        .input('pDataInicio', filtro.dataInicio)
        .input('pDataFim', filtro.dataFim)
        .input('pPagina', filtro.pagina)
        .input('pQuantidade', filtro.quantidade)
        .asyncExecuteOne(procedures.selecionar);
}

async function buscar(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecuteOne(procedures.buscar);
}

async function inserir(ocorrencia) {
    await pg.request()
        .input('pIdDocente', ocorrencia.docente)
        .input('pIdRecurso', ocorrencia.recurso)
        .input('pData', ocorrencia.data)
        .input('pDetalhes', ocorrencia.detalhes)
        .asyncExecute(procedures.inserir);
}

async function alterar(id, ocorrencia) {
    await pg.request()
        .input('pId', id)
        .input('pIdDocente', ocorrencia.docente)
        .input('pIdRecurso', ocorrencia.recurso)
        .input('pData', ocorrencia.data)
        .input('pDetalhes', ocorrencia.detalhes)
        .asyncExecute(procedures.alterar);
}

async function selecionarStatus() {
    return await pg.request()
        .asyncExecute(procedures.selecionarStatus);
}

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    selecionarStatus
}