const mongoose = require('mongoose');

let ocorrenciaSchema = mongoose.Schema({
    "recurso": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'srra-recurso'
    },
    "ocorrencia": String,
    "horario": Date,
    "docente": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'srra-docente'
    }
})

module.exports = mongoose.model('srra-ocorrencia', ocorrenciaSchema);