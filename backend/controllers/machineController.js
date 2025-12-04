// importar modelos
const Machine = require('../models/Machine');
const { validationResult } = require('express-validator');

// criar máquina
exports.createMachine = async (req, res) => {
  try {
    // verificar validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // extrair campos
    const { name, sector, tag, description, status } = req.body;
    // checar tag única
    const exists = await Machine.findOne({ tag });
    if (exists) return res.status(400).json({ message: 'Tag already exists' });

    // criar e salvar
    const machine = new Machine({ name, sector, tag, description, status });
    await machine.save();
    return res.status(201).json(machine);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// listar máquinas com filtros simples
exports.listMachines = async (req, res) => {
  try {
    // aceitar query params: sector, status, search
    const filter = {};
    if (req.query.sector) filter.sector = req.query.sector;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) filter.name = { $regex: req.query.search, $options: 'i' };

    // buscar e retornar
    const machines = await Machine.find(filter).sort({ name: 1 });
    return res.json(machines);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// pegar detalhes de uma máquina
exports.getMachine = async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (!machine) return res.status(404).json({ message: 'Machine not found' });
    return res.json(machine);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// atualizar máquina
exports.updateMachine = async (req, res) => {
  try {
    // validar se houver
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // atualizar por id
    const machine = await Machine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!machine) return res.status(404).json({ message: 'Machine not found' });
    return res.json(machine);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// deletar máquina
exports.deleteMachine = async (req, res) => {
  try {
    const machine = await Machine.findByIdAndDelete(req.params.id);
    if (!machine) return res.status(404).json({ message: 'Machine not found' });
    return res.json({ message: 'Machine deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
