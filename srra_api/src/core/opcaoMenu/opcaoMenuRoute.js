const ctrl = require('./opcaoMenuController');

const routes = [
    {
        url: '/api/opcao-menu',
        routes: [
            { method: 'get', controller: ctrl.selecionar }
        ]
    }
]

module.exports = routes;