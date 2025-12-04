// importar mongoose
const mongoose = require('mongoose');

// função que conecta ao MongoDB usando MONGODB_URI do ambiente
const connectDB = async () => {
  try {
    // conectar no mongodb
    await mongoose.connect(process.env.MONGODB_URI, {
      // opções padrão já cobertas pelo mongoose moderno; mantive vazio
    });
    // log de sucesso
    console.log('MongoDB connected');
  } catch (err) {
    // em caso de erro, log e terminar processo
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// exportar função de conexão
module.exports = connectDB;
