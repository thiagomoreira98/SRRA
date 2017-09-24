const mongoose = require('mongoose');

let recursoSchema = mongoose.Schema({
    "codigo": Number,
    "nome": String,
    "descricao": String,
    "status": Boolean,
    "inativo": {},
    "manutencao": {},
    "itens": []
})

module.exports = mongoose.model('srra-recurso', recursoSchema);