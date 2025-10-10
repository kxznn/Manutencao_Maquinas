const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

const UserRoutes = require('./routes/User');
const MachineRoutes = require('./routes/Machine');

const PORT = 3000;
const app = express();

app.use = (cors());
app.use = (express());

mongoose.connect('http://localhost:27017', {
    useNewUrlPArser: true,
    useUnifiedTopology: true,
})

.then (() =>console.log('Conectado ao MongoDB'))
.catch (err => console.error('Não foi possivel realizar a conexão', err));

app.use ('/api/user', UserRoutes);
app.use ('api/machine', MachineRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});