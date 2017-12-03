const mongoose = require('mongoose');
const Schema = require('./docenteSchema');

async function selecionar() {
    return Schema.find();
}

async function buscar(id) {
    return Schema.findById(id);
}

async function inserir(docente) {
    return Schema.create(docente);
}

async function alterar(id, docente) {
    return Schema.findOneAndUpdate({ _id: id }, docente);
}

async function deletar(id) {
    return Schema.findByIdAndRemove(id);
}

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}