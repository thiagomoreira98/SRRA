const getFiles = require('../../helpers/findFiles'),
    token = require('../../helpers/token');

function trycatch(controller) {
    return async (req, res) => {
        try {
            await token(req);
            await controller(req, res);
        } 
        catch (err) {
            res.error(500, err.message);
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