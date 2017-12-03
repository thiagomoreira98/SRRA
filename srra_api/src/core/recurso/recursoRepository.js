const mongoose = require('mongoose');
const Schema = require('./recursoSchema');

async function selecionar() {
    return Schema.find();
}

async function buscar(id) {
    return Schema.findById(id);
}

async function inserir(recurso) {
    return Schema.create(recurso);
}

async function alterar(id, recurso) {
    return Schema.findOneAndUpdate({ _id: id }, recurso);
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