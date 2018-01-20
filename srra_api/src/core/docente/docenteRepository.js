const pg = require('smn-pg')(global.config.pgSQL);

const procedures = {
    selecionar: 'public.selecionarDocente',
    buscar: 'public.buscarDocente',
    inserir: 'public.inserirDocente',
    alterar: 'public.alterarDocente',
    deletar: 'public.deletarDocente'
}

async function selecionar(filtro) {
    return await pg.request()
        .input('pNome', filtro.nome)
        .input('pMatricula', filtro.matricula)
        .input('pCpf', filtro.cpf)
        .input('pIdFuncao', filtro.funcao == 'Todas' ? null : filtro.funcao)
        .input('pPagina', parseInt(filtro.pagina))
        .input('pQuantidade', parseInt(filtro.quantidade))
        .asyncExecuteOne(procedures.selecionar);
}

async function buscar(id) {
    return await pg.request()
        .input('pId', id)
        .asyncExecuteOne(procedures.buscar);
}

async function inserir(docente) {
    await pg.request()
        .input('pNome', docente.nome)
        .input('pCpf', docente.cpf)
        .input('pMatricula', docente.matricula)
        .input('pEmail', docente.email)
        .input('pSenha', docente.senha)
        .input('pIdFuncao', docente.funcao)
        .asyncExecute(procedures.inserir);
}

async function alterar(id, docente) {
    await pg.request()
        .input('pId', id)
        .input('pNome', docente.nome)
        .input('pCpf', docente.cpf)
        .input('pMatricula', docente.matricula)
        .input('pEmail', docente.email)
        .input('pSenha', docente.senha)
        .input('pIdFuncao', docente.funcao)
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