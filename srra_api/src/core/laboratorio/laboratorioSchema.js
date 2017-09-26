const mongoose = require('mongoose');

let laboratorioSchema = mongoose.Schema({
    "nome": String,
    "descricao": String,
    // "senha": Number
})

module.exports = mongoose.model('srra-laboratorio', laboratorioSchema);