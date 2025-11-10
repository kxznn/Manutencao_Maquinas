const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true},
    tipo: { type: String, required: true},
    status: { type: String, required: true, enum: ["ativa", "inativa", "em manutenção"], default: "ativa"},
    ultimaManutencao: {type: Date, required: true},
    proximaManutencao: {type: Date, required: true},
  },
  {timestamps: true}
);

module.exports = mongoose.model("Machine", machineSchema);
