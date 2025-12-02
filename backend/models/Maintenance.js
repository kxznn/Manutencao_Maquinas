const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema ({
    id: { type: String, required: true, unique: true },
    maquina: {type: String, required: true},
    data: { type: Date, required: true},
    dataConclusao: { type: Date },
    status: { type: String, enum: ['Pendente', 'Em andamento', 'Concluido'], default: 'Pendente', required: true },
});

module.exports = mongoose.model("Maintenance", MaintenanceSchema);