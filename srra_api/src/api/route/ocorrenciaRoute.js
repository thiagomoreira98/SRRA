module.exports = (app) => {
    const controller = require('../../core/ocorrencia/ocorrenciaController');

    app.route('/api/ocorrencia')
        .get(controller.selecionar)
        .post(controller.inserir)

    app.route('/api/ocorrencia/:id')
        .get(controller.buscar)
        .put(controller.alterar)
        .delete(controller.deletar)
}