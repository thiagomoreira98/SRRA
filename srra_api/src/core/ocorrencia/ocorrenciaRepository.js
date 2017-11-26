const mongoose = require('mongoose');
const Schema = require('./ocorrenciaSchema');

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}

function selecionar(filtro, callback) {
    Schema.find(filtro ? { nome: filtro } : {}).populate('recurso').populate('docente').exec((err, data) => {
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

function inserir(ocorrencia, callback) {
    new Schema(ocorrencia).save((err, data) => {
        if (err)
            return callback(err);

        callback(null);
    });
}

function alterar(id, ocorrencia, callback) {
    Schema.findOneAndUpdate({ _id: id }, ocorrencia, (err, data) => {
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