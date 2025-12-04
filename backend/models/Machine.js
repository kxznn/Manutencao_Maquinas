// importar mongoose
const mongoose = require('mongoose');

// schema para máquinas
const MachineSchema = new mongoose.Schema({
  // nome da máquina
  name: { type: String, required: true },
  // setor ou local (ex: linha A, setor 3)
  sector: { type: String, required: true },
  // tag ou código único da máquina
  tag: { type: String, required: true, unique: true },
  // descrição opcional
  description: { type: String },
  // status atual (opcional: 'operational','maintenance','down')
  status: { type: String, default: 'operational' }
}, { timestamps: true });

// exportar model
module.exports = mongoose.model('Machine', MachineSchema);
