const mongoose = require('mongoose');
const Schema = require('./ocorrenciaSchema');

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}

function selecionar(callback) {
    Schema.find().populate('srra-recurso').exec( (err, data) => {
        if(err)
            return callback(err);

        callback(null, data);
    });
}

function buscar(id, callback) {
    Schema.findById(id, (err, data) => {
        if(err)
            return callback(err);

        callback(null, data);
    });
}

function inserir(ocorrencia, callback) {
    new Schema(ocorrencia).save( (err, data) => {
        if(err)
            return callback(err);

        callback(null, data);
    });
}

function alterar(id, ocorrenciaNew, callback) {
    Schema.findByIdAndUpdate(id, ocorrenciaNew, (er, data) => {
        if(err)
            return callback(err)

        callback(null, data)
    })  
}

function deletar(id, callback) {
    Schema.findByIdAndRemove(id, (err, data) => {
        if(err)
            return callback(err);

        callback(null, data);
    });
}