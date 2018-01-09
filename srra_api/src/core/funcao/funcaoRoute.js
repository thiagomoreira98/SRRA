const ctrl = require('./funcaoController');

const routes = [
    {
        url: '/api/funcao',
        routes: [
            { method: 'get', controller: ctrl.selecionar }
        ]
    }
]

module.exports = routes;