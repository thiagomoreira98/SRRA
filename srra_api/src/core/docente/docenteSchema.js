const mongoose = require('mongoose');

let docenteSchema = mongoose.Schema({
    "matricula": Number,
    "cpf": String,
    "nome": String,
    "email": String,
    "senha": String,
    "funcao": String
})

module.exports = mongoose.model('srra-docente', docenteSchema);