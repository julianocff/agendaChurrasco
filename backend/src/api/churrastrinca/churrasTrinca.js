const restful = require('node-restful')
const mongoose = restful.mongoose

const participantesSchema = new mongoose.Schema({
    nome: { type: String },
    pago: { type: Boolean, default: false },
    comBebida: { type: Boolean, default: false }
})

const churrasTrincaSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    data: { type: Date, default: Date.now },
    observacoes: { type: String },
    valorComBebida: { type: Number },
    valorSemBebida: { type: Number },
    participantes: [participantesSchema]
})

module.exports = restful.model('ChurrasTrinca', churrasTrincaSchema)