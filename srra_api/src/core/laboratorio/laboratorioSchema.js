const mongoose = require('mongoose');

let laboratorioSchema = mongoose.Schema({
    "codigo": Number,
    "nome": String,
    "descricao": String,
    // "senha": String
})

module.exports = mongoose.model('srra-laboratorio', laboratorioSchema);