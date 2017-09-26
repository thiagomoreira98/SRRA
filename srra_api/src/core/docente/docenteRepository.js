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
    Schema.find( (err, data) => {
        if(err)
            return callback(err);

        callback(data);
    });
}

function buscar(id, callback) {
    Schema.findById(id, (err, data) => {
        if(err)
            return callback(err);

        callback(data);
    });
}

function inserir(docente, callback) {
    new Schema(docente).save( (err, data) => {
        if(err)
            return res.status(500).json(err);

        res.status(200).json(data);
    });
}

function alterar(id, docenteNew, callback) {
    Schema.findByIdAndUpdate(id, docenteNew).exec().then( (err, data) => {
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