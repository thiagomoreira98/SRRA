const ctrl = require('./authController');
const routes = [
    {
        url: '/api/auth',
        routes: [
            { method: 'post', controller: ctrl.buscarDadosUsuario, public: true },
        ]
    },
    {
        url: '/api/auth/login',
        routes: [
            { method: 'post', controller: ctrl.login, public: true },
        ]
    },
    {
        url: '/api/auth/refazer-login',
        routes: [
            { method: 'get', controller: ctrl.refazerLogin, public: true },
        ]
    }
]

module.exports = routes;