const mongoose = require('mongoose');
require('dotenv')

async function connectDB(uri) {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB.');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        throw error;
    }
}

module.exports = { connectDB };