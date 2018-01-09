const ctrl = require('./tipoRecursoController');
const routes = [
    {
        url: '/api/tipo-recurso',
        routes: [
            { method: 'get', controller: ctrl.selecionar }
        ]
    }
]

module.exports = routes;