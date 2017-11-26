const mongoose = require('mongoose');
const Schema = require('./recursoSchema');

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}

function selecionar(filtro, callback) {
    Schema.find(filtro ? { nome: filtro } : {}, (err, data) => {
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
            return callback(err);

        callback(null);
    });
}

function alterar(id, recurso, callback) {
    Schema.findOneAndUpdate({_id: id}, recurso, (err, data) => {
        if(err)
            return callback(err);

        callback(null);
    });
}

function deletar(id, callback) {
    Schema.findByIdAndRemove(id, (err, data) => {
        if(err)
            return callback(err);

        callback(null);
    });
}