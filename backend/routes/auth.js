const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Schemas de validação com Zod
const registerSchema = z.object({
  nome: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// ✅ Função para gerar token JWT
function signToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      name: user.nome,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    }
  );
}

// ✅ Rota de registro
router.post("/register", async (req, res) => {
  try {
    const { nome, email, password } = registerSchema.parse(req.body);

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(409).json({ error: "Email já cadastrado" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ nome, email, passwordHash });
    const token = signToken(user);

    return res.status(201).json({
      message: "Usuário registrado com sucesso",
      user: { id: user._id, nome: user.nome, email: user.email },
      token,
    });
  } catch (err) {
    if (err?.issues) {
      return res.status(400).json({ error: "Dados inválidos", details: err.issues });
    }
    console.error("Erro no registro:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// ✅ Rota de login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = signToken(user);
    return res.json({
      message: "Login realizado com sucesso",
      user: { id: user._id, nome: user.nome, email: user.email },
      token,
    });
  } catch (err) {
    if (err?.issues) {
      return res.status(400).json({ error: "Dados inválidos", details: err.issues });
    }
    console.error("Erro no login:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// ✅ Rota protegida para retornar o usuário autenticado
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados do usuário" });
  }
});

module.exports = router;
