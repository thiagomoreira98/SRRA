const ctrl = require('./usuarioController');
const routes = [
    {
        url: '/api/usuario',
        routes: [
            { method: 'get', controller: ctrl.selecionar },
            { method: 'post', controller: ctrl.inserir }
        ]
    },
    {
        url: '/api/usuario/:id',
        routes: [
            { method: 'get', controller: ctrl.buscar },
            { method: 'put', controller: ctrl.alterar },
            { method: 'delete', controller: ctrl.deletar }
        ]
    },
    {
        url: '/api/usuario-dropdown',
        routes: [
            { method: 'get', controller: ctrl.selecionarUsuarioDropdown }
        ]
    }
]

module.exports = routes;