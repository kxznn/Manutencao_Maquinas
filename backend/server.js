const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const {connectDB} = require("./db");

const UserRoutes = require('./routes/User');
const MachineRoutes = require('./routes/Machine');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;
connectDB(process.env.MONGO_URI).then(()=>{app.listen(PORT,()=>console.log(`API rodando em http://localhost:${PORT}`));
}).catch((err)=>{
    console.error("Erro ao conectar ao MongoDB",err);
    process.exit(1);
})

app.use ('/api/user', UserRoutes);
app.use ('api/machine', MachineRoutes);
app.get("/",(req,res)=>res.json({status:"ok"}));
app.use("/auth",require("./routes/auth"));
app.use("/orders",require("./routes/orders"))


app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});