const repository = require('./recursoRepository');
const scope = require('./recursoScope');

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}

function selecionar(req, res) {
    repository.selecionar( (err, data) => {
        if(err)
            return res.status(500).json(err);

        res.status(200).json(data);
    });
}

function buscar(req, res) {
    repository.buscar(req.params.id, (err, data) => {
        if(err)
            return res.status(500).json(err);

        res.status(200).json(data);
    });
}

function inserir(req, res) {
    // if(!scope.verificar)
    //     return res.json(req.errors);

    repository.inserir(req.body, (err, data) => {
        if(err)
            return res.status(500).json(err);

        res.status(200).json({message: 'Inserido com Sucesso!'});
    });
}

function alterar(req, res) {
    // if(!scope.verificar)
    //     return res.json(req.errors);

    repository.alterar(req.params.id, req.body, (err, data) => {
        if(err)
            res.status(500).json(err);

        res.status(200).json({message: 'Alterado com Sucesso!'});
    });
}

function deletar(req, res) {
    repository.deletar(req.params.id, (err, data) => {
        if(err)
            return res.status(500).json(err);
        
        res.status(200).json({message: 'Deletado com Sucesso!'});
    });
}