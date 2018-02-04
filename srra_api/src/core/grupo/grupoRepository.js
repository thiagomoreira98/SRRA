const pg = require('smn-pg')(global.config.pgSQL);

const procedures = {
    selecionar: 'seguranca.selecionarGrupo'
}

async function selecionar() {
    return await pg.request()
        .asyncExecute(procedures.selecionar);
}

module.exports = {
    selecionar
}