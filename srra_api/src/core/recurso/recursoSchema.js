const mongoose = require('mongoose');

let recursoSchema = mongoose.Schema({
    "codigoPatrimonio": Number,
    "nome": String,
    "descricao": String,
    "status": String,
    "data": Date,
    "motivo": String,
    "itens": []
})

module.exports = mongoose.model('srra-recurso', recursoSchema);