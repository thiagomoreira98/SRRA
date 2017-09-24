const mongoose = require('mongoose');
const schema = require('./recursoSchema');

module.exports = {
    selecionar,
    buscar,
    inserir,
    alterar,
    deletar
}

async function selecionar() {
    return schema.find();
}

async function buscar(id) {
    return schema.findById(id);
}

async function inserir(recurso) {
    await new schema(recurso).save();
}

async function alterar(id, recursoNew) {
    let recursoOld = await schema.findById(id);
    
    for(item in recursoOld) {
        recursoOld.item = recursoNew.item
    }
    
    recursoOld.save();
}

async function deletar(id) {
    return schema.findByIdAndRemove(id);
}