const ctrl = require('./reservaController');
const routes = [
    {
        url: '/api/reserva',
        routes: [
            { method: 'get', controller: ctrl.selecionar },
            { method: 'post', controller: ctrl.inserir }
        ]
    },
    {
        url: '/api/reserva/:id',
        routes: [
            { method: 'get', controller: ctrl.buscar },
            { method: 'put', controller: ctrl.alterar },
            { method: 'delete', controller: ctrl.deletar }
        ]
    },
    {
        url: '/api/status-reserva',
        routes: [
            { method: 'get', controller: ctrl.selecionarStatus }
        ]
    }
]

module.exports = routes;