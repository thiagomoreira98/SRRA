const getFiles = require('../../helpers/findFiles');

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
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (ex) {
            res.finish(new global.responseError(500, ex.message, ex));
        }
    }
}