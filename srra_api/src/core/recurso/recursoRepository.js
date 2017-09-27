const mongoose = require('mongoose');
const Schema = require('./recursoSchema');

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}

function selecionar(callback) {
    Schema.find( (err, data) => {
        if(err)
            return callback(err);

        callback(null, data);
    });
}

function buscar(id, callback) {
    Schema.findById(id, (err, data) => {
        if(err)
            return callback(500, err);

        callback(null, data);
    });
}


function inserir(recurso, callback) {
    new Schema(recurso).save( (err, data) => {
        if(err)
            return res.status(500).json(err);

        res.status(200).json({message: 'Inserido com Sucesso!'});
    });
}

function alterar(id, recursoNew, callback) {
    Schema.findByIdAndUpdate(id, recursoNew).then( (err, data) => {
        if(err)
            return callback(err);

        callback(data);
    }) 
}

function deletar(id, callback) {
    Schema.findByIdAndRemove(id, (err, data) => {
        if(err)
            return callback(err);

        callback(data);
    });
}