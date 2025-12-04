// importar mongoose
const mongoose = require('mongoose');

// definir schema do usuário (para autenticação e responsabilidade)
const UserSchema = new mongoose.Schema({
  // nome do usuário
  name: { type: String, required: true },
  // email único
  email: { type: String, required: true, unique: true },
  // senha (hashed)
  password: { type: String, required: true },
  // papel/role (ex: admin, tecnico)
  role: { type: String, default: 'technician' }
}, { timestamps: true }); // adiciona createdAt e updatedAt automaticamente

// exportar model
module.exports = mongoose.model('User', UserSchema);
