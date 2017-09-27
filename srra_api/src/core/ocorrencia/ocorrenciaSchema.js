const mongoose = require('mongoose');

let ocorrenciaSchema = mongoose.Schema({
    "codigo": Number,
    "recurso": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'srra-recurso'
    },
    "detalhes": String,
    "data": Date,
    "docente": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'srra-docente'
    }
})

module.exports = mongoose.model('srra-ocorrencia', ocorrenciaSchema);