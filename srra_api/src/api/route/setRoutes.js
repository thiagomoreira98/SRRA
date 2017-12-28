const getFiles = require('../../helpers/findRoutes');

function trycatch(controller) {
    return async (req, res) => {
        try {
            await controller(req, res);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

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