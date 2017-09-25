const mongoose = require('mongoose');

let ocorrenciaSchema = mongoose.Schema({
    // "matricula": Number,
    // "cpf": Number,
    // "nome": String,
    // "email": String,
    // "senha": Number
})

module.exports = mongoose.model('srra-docente', ocorrenciaSchema);