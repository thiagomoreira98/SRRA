const pg = require('smn-pg')(global.config.pgSQL);

const procedures = {
    selecionar: 'public.selecionarOcorrencia',
    buscar: 'public.buscarOcorrencia',
    inserir: 'public.inserirOcorrencia',
    alterar: 'public.alterarOcorrencia',
    deletar: 'public.deletarOcorrencia'
}

async function selecionar(filtro) {
    return await pg.request()
        .input('pRecurso', filtro.recurso)
        .input('pDocente', filtro.docente)
        .input('pDataInicio', filtro.dataInicio)
        .input('pDataFim', filtro.dataFim)
        .asyncExecuteOne(procedures.selecionar);
}

async function buscar(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecuteOne(procedures.buscar);
}

async function inserir(ocorrencia) {
    await pg.request()
        .input('pIdDocente', ocorencia.docente)
        .input('pIdRecurso', ocorencia.recurso)
        .input('pData', ocorencia.data)
        .input('pDetalhes', ocorencia.detalhes)
        .asyncExecute(procedures.inserir);
}

async function alterar(id, ocorencia) {
    await pg.request()
        .input('pId', id)
        .input('pIdDocente', ocorencia.docente)
        .input('pIdRecurso', ocorencia.recurso)
        .input('pData', ocorencia.data)
        .input('pDetalhes', ocorencia.detalhes)
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