const ctrl = require('./statusRecursoController');
const routes = [
    {
        url: '/api/status-recurso',
        routes: [
            { method: 'get', controller: ctrl.selecionar }
        ]
    }
]

module.exports = routes;