const ctrl = require('./ocorrenciaController');
const routes = [
    {
        url: '/api/ocorrencia',
        routes: [
            { method: 'get', controller: ctrl.selecionar },
            { method: 'post', controller: ctrl.inserir }
        ]
    },
    {
        url: '/api/ocorrencia/:id',
        routes: [
            { method: 'get', controller: ctrl.buscar },
            { method: 'put', controller: ctrl.alterar },
            { method: 'delete', controller: ctrl.deletar }
        ]
    },
    {
        url: '/api/status-ocorrencia',
        routes: [
            { method: 'get', controller: ctrl.selecionarStatus }
        ]
    }
]

module.exports = routes;