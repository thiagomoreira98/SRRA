const config = require('../../../config/config'),
    asyncRequest = require('request-promise');

async function autenticar(token) {

    let options = {
        url: `${config.seguranca.host}:${config.seguranca.port}/api/auth/refazer-login`,
        method: 'GET',
        headers: {
            'Authentication': token
        },
        json: true
    }

    try {
        let retorno = await asyncRequest(options);
        return retorno.content;
    }
    catch(ex) {
        throw ex.error;
    }
}

module.exports = autenticar;