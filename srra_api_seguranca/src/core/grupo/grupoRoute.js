const ctrl = require('./grupoController');

const routes = [
    {
        url: '/api/grupo',
        routes: [
            { method: 'get', controller: ctrl.selecionar },
            { method: 'post', controller: ctrl.inserir }
        ]
    },
    {
        url: '/api/grupo/:id',
        routes: [
            { method: 'get', controller: ctrl.buscar },
            { method: 'put', controller: ctrl.alterar },
            { method: 'delete', controller: ctrl.deletar }
        ]
    },
    {
        url: '/api/grupo-dropdown',
        routes: [
            { method: 'get', controller: ctrl.selecionarDropdown }
        ]
    },
]

module.exports = routes;