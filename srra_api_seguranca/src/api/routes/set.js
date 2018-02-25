const getFiles = require('../../helpers/findFiles'),
    token = require('../../helpers/token');

function trycatch(public, controller) {
    return async (req, res) => {
        try {

            if (!public)
                await token(req);

            await controller(req, res);
        }
        catch (ex) {
            res.error(ex.statusCode || 500, ex.message);
        }
    }
}

module.exports = (app) => {

    const files = getFiles('./src/core', ['Route.js']);

    files.map(file => {
        let routes = require('../.' + file.route.replace('src/', ''));

        routes.map(x => {
            x.routes.map(y => {
                app[y.method](x.url, trycatch(y.public, y.controller));
            });
        });
    });
};