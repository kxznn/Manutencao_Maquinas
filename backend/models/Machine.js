const mongoose = require('mongoose')

const MaquinaSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    tipo: {type: String, required: true},
    status: {type: String, required: true},
    ultimaManutencao: {type: String, required: true},
    proximaManutencao: {type: Date, required: true}
});

module.exports = mongoose.model('Maquina', MaquinaSchema);