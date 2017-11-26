const mongoose = require('mongoose');
const Schema = require('./laboratorioSchema');

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}

function selecionar(filtro, callback) {
    Schema.find(filtro ? { nome: filtro } : {}, (err, data) => {
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

function inserir(laboratorio, callback) {
    new Schema(laboratorio).save((err, data) => {
        if (err)
            return callback(err);

        callback(null);
    });
}

function alterar(id, laboratorio, callback) {
    Schema.findOneAndUpdate({_id: id}, laboratorio, (err, data) => {
        if (err)
            return callback(err);

        callback(null);
    });
}

function deletar(id, callback) {
    Schema.findByIdAndRemove(id, (err, data) => {
        if (err)
            return callback(err);

        callback(null);
    });
}