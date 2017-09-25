module.exports = (app) => {
    const controller = require('../../core/docente/docenteController');

    app.route('/docente')
        .get(controller.selecionar)
        .post(controller.inserir)

    app.route('/docente/:id')
        .get(controller.buscar)
        .put(controller.alterar)
        .delete(controller.deletar)
}