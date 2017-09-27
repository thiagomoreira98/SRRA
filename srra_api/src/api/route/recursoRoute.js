module.exports = (app) => {
    const controller = require('../../core/recurso/recursoController');

    app.route('/api/recurso')
        .get(controller.selecionar)
        .post(controller.inserir)

    app.route('/api/recurso/:id')
        .get(controller.buscar)
        .put(controller.alterar)
        .delete(controller.deletar)
}