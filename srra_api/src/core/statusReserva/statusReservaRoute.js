const ctrl = require('./statusReservaController');
const routes = [
    {
        url: '/api/status-reserva',
        routes: [
            { method: 'get', controller: ctrl.selecionar }
        ]
    }
]

module.exports = routes;