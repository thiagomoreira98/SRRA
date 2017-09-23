const repository = require('./recursoRepository');
const scope = require('./recursoScope');

module.exports = {
    selecionar,
    // inserir,
    // alterar,
    // deletar
}

async function selecionar(req, res, next) {
    let response = await repository.selecionar();
    // res.finish(new global.responseOk(200, response));
    res.json(response);
}

async function inserir(req, res, next) {
    // if(!scope.verificar)
    //     return res.finish(req.errors);

    await repository.inserir(req.body);
    // res.finish(new global.responseOk(200))
}

// async function alterar(req, res, next) {
//     if(!scope.verificar)
//     return res.finish(req.errors);

//     await repository.alterar(req.body);
//     res.finish(new global.responseOk(200));
// }

// async function deletar(req, res, next) {
//     await repository.deletar(req.params.id);
//     res.finish(new global.responseOk(200));
// }