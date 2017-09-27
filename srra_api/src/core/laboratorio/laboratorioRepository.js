const mongoose = require('mongoose');
const Schema = require('./laboratorioSchema');

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
            return callback(err);

        callback(null, data);
    });
}

function inserir(laboratorio, callback) {
    new Schema(laboratorio).save( (err, data) => {
        if(err)
            return callback(err);

        callback(null, data);
    });
}

function alterar(id, laboratorioNew, callback) {
    Schema.findByIdAndUpdate(id, laboratorioNew, (err, data) => {
        if(err)
            return callback(err)

        callback(null, data);
    });    
}

function deletar(id, callback) {
    Schema.findByIdAndRemove(id, (err, data) => {
        if(err)
            return callback(err);

        callback(null, data);
    });
}