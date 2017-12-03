const mongoose = require('mongoose');
const Schema = require('./laboratorioSchema');

async function selecionar() {
    return Schema.find();
}

async function buscar(id) {
    return Schema.findById(id);
}

async function inserir(laboratorio) {
    return Schema.create(laboratorio);
}

async function alterar(id, laboratorio) {
    return Schema.findOneAndUpdate({ _id: id }, laboratorio);
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