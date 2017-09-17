const ctrl = require('./recursoController');
const routes = [
        {
            url: '/api/recurso',
            routes: [
                { method: 'get', controller: ctrl.selecionar },
                { method: 'post', controller:  ctrl.inserir }
            ]
        },
        {
            url: '/api/recurso/:id',
            routes: [
                { method: 'put', controller: ctrl.alterar },
                { method: 'delete',  controller: ctrl.deletar }
            ]
        }
    ];

module.exports = routes;