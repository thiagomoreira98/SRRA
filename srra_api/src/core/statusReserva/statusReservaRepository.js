const pg = require('smn-pg')(global.config.pgSQL);

const procedures = {
    selecionar: 'public.selecionarStatusReserva'
}

async function selecionar() {
    return await pg.request()
        .asyncExecute(procedures.selecionar);
}

module.exports = {
    selecionar
}