// importar modelos
const Maintenance = require('../models/Maintenance');
const Machine = require('../models/Machine');
const { validationResult } = require('express-validator');

// criar manutenção
exports.createMaintenance = async (req, res) => {
  try {
    // validar
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    // extrair campos
    const { machine, description, scheduledAt, type, technician, notes } = req.body;
    // checar se máquina existe
    const m = await Machine.findById(machine);
    if (!m) return res.status(400).json({ message: 'Machine not found' });

    // criar e salvar
    const maintenance = new Maintenance({ machine, description, scheduledAt, type, technician, notes });
    await maintenance.save();
    return res.status(201).json(maintenance);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// listar manutenções com filtros (por máquina, data, status)
exports.listMaintenances = async (req, res) => {
  try {
    // construir filtro
    const filter = {};
    if (req.query.machine) filter.machine = req.query.machine;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.from || req.query.to) {
      filter.scheduledAt = {};
      if (req.query.from) filter.scheduledAt.$gte = new Date(req.query.from);
      if (req.query.to) filter.scheduledAt.$lte = new Date(req.query.to);
    }

    // popular dados da máquina e técnico
    const maints = await Maintenance.find(filter).populate('machine').populate('technician').sort({ scheduledAt: 1 });
    return res.json(maints);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// pegar detalhes de uma manutenção
exports.getMaintenance = async (req, res) => {
  try {
    const m = await Maintenance.findById(req.params.id).populate('machine').populate('technician');
    if (!m) return res.status(404).json({ message: 'Maintenance not found' });
    return res.json(m);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// atualizar manutenção (ex: marcar como done)
exports.updateMaintenance = async (req, res) => {
  try {
    const maint = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!maint) return res.status(404).json({ message: 'Maintenance not found' });
    return res.json(maint);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// deletar manutenção
exports.deleteMaintenance = async (req, res) => {
  try {
    const m = await Maintenance.findByIdAndDelete(req.params.id);
    if (!m) return res.status(404).json({ message: 'Maintenance not found' });
    return res.json({ message: 'Maintenance deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// endpoint para KPIs simples (ex: contagem por status)
exports.kpis = async (req, res) => {
  try {
    // agregação: contar manutencoes por status
    const byStatus = await Maintenance.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    // contar máquinas
    const totalMachines = await Machine.countDocuments();
    // contar manutenções futuras e pendentes
    const scheduledCount = await Maintenance.countDocuments({ status: 'scheduled' });
    // retornar objeto com KPIs
    return res.json({
      totalMachines,
      scheduledCount,
      byStatus
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
