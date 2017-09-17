const mongoose = require('mongoose');
const schema = require('./recursoSchema');

module.exports = {
    selecionar,
    inserir,
    alterar,
    deletar
}

async function selecionar() {
    return schema.find();
}

async function inserir(recurso) {
    await new schema(recurso).save();
}

async function alterar(id, recurso) {
    let recursoOld = await schema.findById(id);
    recursoOld = recurso;
    recursoOld.save();

}

async function deletar(id) {
    return schema.findByIdAndRemove(id);
}