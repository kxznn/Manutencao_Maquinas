// importar mongoose
const mongoose = require('mongoose');

// schema para registros de manutenção
const MaintenanceSchema = new mongoose.Schema({
  // referencia para a máquina envolvida
  machine: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine', required: true },
  // tipo: preventiva, corretiva, preditiva
  type: { type: String, enum: ['preventive','corrective','predictive'], default: 'preventive' },
  // descrição do serviço/atividade realizada
  description: { type: String, required: true },
  // data programada para a manutenção
  scheduledAt: { type: Date, required: true },
  // data de realização (quando concluído)
  performedAt: { type: Date },
  // status: scheduled, in_progress, done, canceled
  status: { type: String, enum: ['scheduled','in_progress','done','canceled'], default: 'scheduled' },
  // técnico responsável (opcional, link para User)
  technician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // observações e histórico adicional
  notes: { type: String }
}, { timestamps: true });

// exportar model
module.exports = mongoose.model('Maintenance', MaintenanceSchema);
