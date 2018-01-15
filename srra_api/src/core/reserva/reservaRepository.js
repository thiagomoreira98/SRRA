const pg = require('smn-pg')(global.config.pgSQL);

const procedures = {
    selecionar: 'public.selecionarReserva',
    buscar: 'public.buscarReserva',
    inserir: 'public.inserirReserva',
    alterar: 'public.alterarReserva',
    deletar: 'public.deletarReserva'
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

async function inserir(reserva) {
    await pg.request()
        .input('pIdDocente', reserva.docente)
        .input('pIdRecurso', reserva.recurso)
        .input('pData', reserva.data)
        .asyncExecute(procedures.inserir);
}

async function alterar(id, reserva) {
    await pg.request()
        .input('pId', id)
        .input('pIdDocente', reserva.docente)
        .input('pIdRecurso', reserva.recurso)
        .input('pData', reserva.data)
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