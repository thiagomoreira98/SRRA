const mongoose = require('mongoose');
const schema = require('./recursoSchema');

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

function inserir(recurso, callback) {
    new schema(recurso).save( (err, data) => {
        if(err)
            return res.status(500).json(err);

        res.status(200).json({message: 'Inserido com Sucesso!'});
    });
}

function alterar(id, recursoNew, callback) {
    schema.findById(id, (err, data) => {
        if(err)
            return callback(err);
        
        for(item in data) {
            if(item != "_id")
                data[item] = recursoNew[item]
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