const mongoose = require('mongoose');

let docenteSchema = mongoose.Schema({
    "matricula": Number,
    "cpf": Number,
    "nome": String,
    "email": String,
    "senha": Number
})

module.exports = mongoose.model('srra-docente', docenteSchema);