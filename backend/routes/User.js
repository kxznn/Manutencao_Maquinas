const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { nome, email, password } = req.body;

    // Verifica se já existe usuário com esse email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }

    // Criptografa a senha
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ nome, email, passwordHash });
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash"); // oculta hash
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar usuário
router.put("/:id", async (req, res) => {
  try {
    const { nome, email } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { nome, email },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar usuário
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.json({ message: "Usuário deletado com sucesso." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
