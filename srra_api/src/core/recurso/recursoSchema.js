const mongoose = require('mongoose');

let recursoSchema = mongoose.Schema({
    "codigo": Number,
    "nome": String,
    "descricao": String,
    "quantidade": Number,
    "inativo": Boolean,
    "manutencao": Boolean,
    "itens": []
})

module.exports = mongoose.model('srra-recurso', recursoSchema);