const mongoose = require('mongoose');

let ocorrenciaSchema = mongoose.Schema({
    "codigo": Number,
    "recurso": String,
    "detalhes": String,
    "data": Date,
    "docente": String,
})

module.exports = mongoose.model('srra-ocorrencia', ocorrenciaSchema);