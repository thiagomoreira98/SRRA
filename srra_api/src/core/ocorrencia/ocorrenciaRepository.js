const mongoose = require('mongoose');
const Schema = require('./ocorrenciaSchema');

async function selecionar() {
    return Schema.find();
}

async function buscar(id) {
    return Schema.findById(id);
}

async function inserir(ocorrencia) {
    return Schema.create(ocorrencia);
}

async function alterar(id, ocorrencia) {
    return Schema.findOneAndUpdate({ _id: id }, ocorrencia);
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