const express = require("express");
const mongoose = require("mongoose");
const Machine = require("../models/Machine");
const auth = require("../middleware/auth"); // opcional: proteger as rotas

const router = express.Router();

// Criar uma nova máquina
router.post("/", auth, async (req, res) => {
  try {
    const { nome, tipo, status, ultimaManutencao, proximaManutencao } = req.body;

    const novaMaquina = await Machine.create({
      nome,
      tipo,
      status,
      ultimaManutencao,
      proximaManutencao,
    });

    res.status(201).json(novaMaquina);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todas as máquinas
router.get("/", auth, async (req, res) => {
  try {
    const maquinas = await Machine.find();
    res.json(maquinas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obter uma máquina pelo ID
router.get("/:id", auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const maquina = await Machine.findById(req.params.id);
    if (!maquina) {
      return res.status(404).json({ error: "Máquina não encontrada" });
    }

    res.json(maquina);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar uma máquina
router.put("/:id", auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const { nome, tipo, status, ultimaManutencao, proximaManutencao } = req.body;

    const maquinaAtualizada = await Machine.findByIdAndUpdate(
      req.params.id,
      { nome, tipo, status, ultimaManutencao, proximaManutencao },
      { new: true, runValidators: true }
    );

    if (!maquinaAtualizada) {
      return res.status(404).json({ error: "Máquina não encontrada" });
    }

    res.json(maquinaAtualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Deletar uma máquina
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const maquinaDeletada = await Machine.findByIdAndDelete(req.params.id);
    if (!maquinaDeletada) {
      return res.status(404).json({ error: "Máquina não encontrada" });
    }

    res.json({ message: "Máquina deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
