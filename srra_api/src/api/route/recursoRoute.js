module.exports = (app) => {
    const controller = require('../../core/recurso/recursoController');

    app.route('/recurso')
        .get(controller.selecionar)
        .post(controller.inserir)

    app.route('/recurso/:id')
        .get(controller.buscar)
        .put(controller.alterar)
        .delete(controller.deletar)
}