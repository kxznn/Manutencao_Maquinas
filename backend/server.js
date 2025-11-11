const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const { connectDB } = require("./config/database");

// Importação das rotas
const UserRoutes = require("./routes/User");
const MachineRoutes = require("./routes/machine");
const AuthRoutes = require("./routes/auth");
const OrdersRoutes = require("./routes/orders");

const app = express();

// Middlewares globais
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rotas
app.use("/api/user", UserRoutes);
app.use("/api/machine", MachineRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/orders", OrdersRoutes);

app.get("/", (req, res) => res.json({ status: "ok" }));

// Conexão com o MongoDB e inicialização do servidor
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB", err);
    process.exit(1);
  }
}

startServer();
