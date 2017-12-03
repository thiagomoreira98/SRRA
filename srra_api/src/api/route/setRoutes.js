const getFiles = require('../../helpers/findRoutes');

module.exports = (app) => {

const files = getFiles('./src/core', ['Route.js']);

    files.map(file => {
        let routes = require('../.' + file.route.replace('src/', ''));

        routes.map(x => {
            x.routes.map(y => {
                app[y.method](x.url, trycatch(y.controller));
            });
        });
    });
};

function trycatch(controller) {
    return async (req, res) => {
        try {
            // if (!public) {
            //     let retorno = token(req);
            //     if (retorno)
            //         return res.status(retorno.code).json(retorno);
            // }
            await controller(req, res);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}