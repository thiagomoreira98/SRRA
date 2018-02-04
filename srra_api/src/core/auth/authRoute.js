const ctrl = require('./authController');
const routes = [
    {
        url: '/api/auth/:usuario',
        routes: [
            { method: 'get', controller: ctrl.buscarDadosUsuario },
        ]
    },
    {
        url: '/api/auth/login/:id/:senha',
        routes: [
            { method: 'get', controller: ctrl.login },
        ]
    },
    // {
    //     url: '/api/auth/refazer',
    //     routes: [
    //         { method: 'get', controller: ctrl.refazerLogin },
    //     ]
    // }
]

module.exports = routes;