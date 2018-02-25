const config = require('../../../config/config'),
    asyncRequest = require('request-promise');

async function autenticar(user, token) {

    let options = {
        url: `${config.seguranca.host}:${config.seguranca.port}/api/auth/refazer-login`,
        method: 'GET',
        headers: {
            'Authentication': token
        },
        json: true
    }

    try {
        return await asyncRequest(options);
    }
    catch(ex) {
        throw ex;
    }
}

module.exports = autenticar;