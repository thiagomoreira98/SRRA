const mongoose = require('mongoose');

let laboratorioSchema = mongoose.Schema({
    "nome": String,
    "descricao": String,
})

module.exports = mongoose.model('srra-laboratorio', laboratorioSchema);