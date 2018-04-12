const ctrl = require('./recursoController');
const routes = [
    {
        url: '/api/recurso',
        routes: [
            { method: 'get', controller: ctrl.selecionar },
            { method: 'post', controller: ctrl.inserir }
        ]
    },
    {
        url: '/api/recurso/:id',
        routes: [
            { method: 'get', controller: ctrl.buscar },
            { method: 'put', controller: ctrl.alterar },
            { method: 'delete', controller: ctrl.deletar }
        ]
    },
    {
        url: '/api/status-recurso',
        routes: [
            { method: 'get', controller: ctrl.selecionarStatus }
        ]
    },
    {
        url: '/api/tipo-recurso',
        routes: [
            { method: 'get', controller: ctrl.selecionarTipo }
        ]
    },
    {
        url: '/api/recurso-dropdown',
        routes: [
            { method: 'get', controller: ctrl.selecionarRecursoDropdown }
        ]
    }
]

module.exports = routes;