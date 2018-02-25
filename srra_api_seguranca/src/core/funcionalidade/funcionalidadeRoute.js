const ctrl = require('./funcionalidadeController');

const routes = [
    {
        url: '/api/grupo-funcionalidade',
        routes: [
            { method: 'get', controller: ctrl.selecionar }
        ]
    }
]

module.exports = routes;