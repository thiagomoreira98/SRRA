const mongoose = require('mongoose');

let docenteSchema = mongoose.Schema({
    "nome": String,
    "cpf": Number,
    "matricula": Number,
    "email": String,
    "senha": Number
})

module.exports = mongoose.model('srra-docente', docenteSchema);