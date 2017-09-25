const mongoose = require('mongoose');
const schema = require('./ocorrenciaSchema');

module.exports = {
    selecionar,
    inserir,
    alterar,
    deletar
}

function selecionar(callback) {
    schema.find( (err, data) => {
        if(err)
            return callback(err);

        callback(data);
    });
}

function inserir(ocorrencia, callback) {
    new schema(ocorrencia).save( (err, data) => {
        if(err)
            return res.status(500).json(err);

        res.status(200).json({message: 'Inserido com Sucesso!'});
    });
}

function alterar(id, ocorrenciaNew, callback) {
    schema.findById(id, (err, data) => {
        if(err)
            return callback(err);
        
        for(item in data) {
            if(item != "_id")
                data[item] = ocorrenciaNew[item]
        }

        data.save( (err, data) => {
            if(err)
                return callback(err)
            
            callback(data);
        });
    });    
}

function deletar(id, callback) {
    schema.findByIdAndRemove(id, (err, data) => {
        if(err)
            return callback(err);

        callback(data);
    });
}