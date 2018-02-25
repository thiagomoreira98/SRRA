const config = require('../../../config/config'),
    pg = require('smn-pg')(config.pg);

const procedures = {
    selecionar: 'public.selecionarTipoRecurso'
}

async function selecionar() {
    return await pg.request()
        .asyncExecute(procedures.selecionar);
}

module.exports = {
    selecionar
}