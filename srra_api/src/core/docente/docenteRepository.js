const mongoose = require('mongoose');
const schema = require('./docenteSchema');

module.exports = {
    selecionar,
    inserir,
    alterar,
    deletar
}

async function selecionar() {
    return schema.find();
}

async function inserir(docente) {
    await new schema(docente).save();
}

async function alterar(id, docente) {
    let docenteOld = await schema.findById(id);
    docenteOld = docente;
    recursoOld.save();

}

async function deletar(id) {
    return schema.findByIdAndRemove(id);
}