const mongoose = require('mongoose');

let ocorrenciaSchema = mongoose.Schema({
    "codigo": Number,
    "recurso": {
        type: mongoose.Schema.ObjectId,
        ref: "srra-recurso",
        required: true
    },
    "detalhes": String,
    "data": Date,
    "docente": {
        type: mongoose.Schema.ObjectId,
        ref: "srra-docente",
        required: true
    },
})

module.exports = mongoose.model('srra-ocorrencia', ocorrenciaSchema);