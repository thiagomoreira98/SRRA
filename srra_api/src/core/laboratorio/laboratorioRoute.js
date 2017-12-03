const ctrl = require('./laboratorioController');
const routes = [
    {
        url: '/api/laboratorio',
        routes: [
            { method: 'get', controller: ctrl.selecionar },
            { method: 'post', controller: ctrl.inserir }
        ]
    },
    {
        url: '/api/laboratorio/:id',
        routes: [
            { method: 'get', controller: ctrl.buscar },
            { method: 'put', controller: ctrl.alterar },
            { method: 'delete', controller: ctrl.deletar }
        ]
    }
]

module.exports = routes;