const mongoose = require('mongoose');
const Schema = require('./ocorrenciaSchema');

async function selecionar() {
    return await Schema.find();
}

async function buscar(id) {
    return await Schema.findById(id);
}

async function inserir(docente) {
    await Schema.create(docente);
}

async function alterar(id, docente) {
    await Schema.findOneAndUpdate({ _id: id }, docente);
}

async function deletar(id) {
    await Schema.findByIdAndRemove(id);
}

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}