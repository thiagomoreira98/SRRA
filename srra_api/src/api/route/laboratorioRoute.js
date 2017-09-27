module.exports = (app) => {
    const controller = require('../../core/laboratorio/laboratorioController');

    app.route('/api/laboratorio')
        .get(controller.selecionar)
        .post(controller.inserir)

    app.route('/api/laboratorio/:id')
        .get(controller.buscar)
        .put(controller.alterar)
        .delete(controller.deletar)
}