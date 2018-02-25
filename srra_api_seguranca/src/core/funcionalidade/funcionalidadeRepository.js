const config = require('../../../config/config'),
    pg = require('smn-pg')(config.pg);

module.exports = {
    selecionar
}

const procedures = {
    selecionar: 'seguranca.selecionarFuncionalidade'
}

async function selecionar() {
    return await pg.request()
        .asyncExecute(procedures.selecionar);
}