module.exports = (app) => {
    const controller = require('../../core/ocorrencia/ocorrenciaController');

    app.route('/ocorrencia')
        .get(controller.selecionar)
        .post(controller.inserir)

    app.route('/ocorrencia/:id')
        .get(controller.buscar)
        .put(controller.alterar)
        .delete(controller.deletar)
}