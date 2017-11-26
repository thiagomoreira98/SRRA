const mongoose = require('mongoose');
const Schema = require('./docenteSchema');

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}

function selecionar(callback) {
    Schema.find((err, data) => {
        if (err)
            return callback(err);

        callback(null, data);
    });
}

function buscar(id, callback) {
    Schema.findById(id, (err, data) => {
        if (err)
            return callback(err);

        callback(null, data);
    });
}

function inserir(docente, callback) {
    new Schema(docente).save((err, data) => {
        if (err)
            return callback(err);

        callback(null);                
    });
}

function alterar(id, docente, callback) {
    Schema.findOneAndUpdate({ _id: id }, docente, (err, docenteUp) => {
        if (err)
            return callback(err);

        callback(null);
    })
}

function deletar(id, callback) {
    Schema.findByIdAndRemove(id, (err, data) => {
        if (err)
            return callback(err);

        callback(null);
    });
}