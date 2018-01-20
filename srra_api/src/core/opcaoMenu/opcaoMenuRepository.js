const pg = require('smn-pg')(global.config.pgSQL);

const procedures = {
    selecionar: 'seguranca.selecionarOpcaoMenu'
}

async function selecionar() {
    return await pg.request()
        .asyncExecute(procedures.selecionar);
}

module.exports = {
    selecionar
}