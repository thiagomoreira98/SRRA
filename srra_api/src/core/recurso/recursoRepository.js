const pg = require('smn-pg')(global.config.pgSQL);

const procedures = {
    selecionar: 'public.selecionarRecurso',
    buscar: 'public.buscarRecurso',
    inserir: 'public.inserirRecurso',
    alterar: 'public.alterarRecurso',
    deletar: 'public.deletarRecurso'
}

async function selecionar() {
    return await pg.request()
        .asyncExecute(procedures.selecionar);
}

async function buscar(id) {
    return await pg.request()
        .asyncExecuteOne(procedures.buscar);
}

async function inserir(recurso) {
    await pg.request()
        .input('pNome', recurso.nome)
        .input('pDescricao', recurso.descricao)
        .input('pIdStatus', recurso.status)
        .input('pIdTipoRecurso', recurso.tipoRecurso)
        .input('pDataMotivo', recurso.dataMotivo || null)
        .input('pItens', JSON.stringify(recurso.itens) || '[]')
        .asyncExecute(procedures.inserir);
}

async function alterar(id, recurso) {
    await pg.request()
        .input('pId', id)
        .input('pNome', recurso.nome)
        .input('pDescricao', recurso.descricao)
        .input('pIdStatus', recurso.status)
        .input('pIdTipoRecurso', recurso.tipoRecurso)
        .input('pDataMotivo', recurso.dataMotivo || null)
        .input('pItens', JSON.stringify(recurso.itens) || '[]')
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