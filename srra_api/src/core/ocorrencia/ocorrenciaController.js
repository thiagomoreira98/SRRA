const repository = require('./ocorrenciaRepository');
const scope = require('./ocorrenciaScope');

module.exports = {
    selecionar,
    inserir,
    alterar,
    deletar
}

function selecionar(req, res) {
    repository.selecionar( (err, data) => {
        if(err)
            return res.status(500).json(err);

        res.status(200).json(data);
    })
}

function inserir(req, res) {
    // if(!scope.verificar)
    //     return res.json(req.errors);

    repository.inserir(req.body, (err, data) => {
        if(err)
            return res.status(500).json(err);

        res.status(200).json(data);
    })
}

function alterar(req, res) {
    // if(!scope.verificar)
    // return res.json(req.errors);

    repository.alterar(req.params.id, req.body, (err, data) => {
        if(err)
            res.status(500).json(err);

        res.status(200).json(data);
    })
}

function deletar(req, res) {
    repository.deletar(req.params.id, (err, data) => {
        if(err)
            return res.status(500).json(err);
        
        res.status(200).json(data);
    })
}