const ctrl = require('./grupoController');

const routes = [
    {
        url: '/api/grupo',
        routes: [
            { method: 'get', controller: ctrl.selecionar }
        ]
    }
]

module.exports = routes;