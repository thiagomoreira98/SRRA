const mongoose = require('mongoose');

let docenteSchema = mongoose.Schema({
    "matricula": Number,
    "cpf": Number,
    "nome": String,
    "email": String,
    "senha": Number,
    "funcao": String
})

module.exports = mongoose.model('srra-docente', docenteSchema);