const mongoose = require("mongoose");

async function connectDB(uri) {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Conexão com MongoDB estabelecida");
  } catch (error) {
    console.error(" Erro ao conectar ao MongoDB:", error.message);
    process.exit(1); 
  }
}

module.exports = { connectDB };
