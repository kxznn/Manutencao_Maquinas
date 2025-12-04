// importar express
const express = require('express');
// criar router
const router = express.Router();
// importar controller
const maintenanceController = require('../controllers/maintenanceController');
// importar auth middleware
const auth = require('../middlewares/Auth');
// importar validator
const { maintenanceValidator } = require('../utils/validators');

// GET /api/maintenances -> listar com filtros
router.get('/', auth, maintenanceController.listMaintenances);

// POST /api/maintenances -> criar manutenção
router.post('/', auth, maintenanceValidator, maintenanceController.createMaintenance);

// GET /api/maintenances/:id -> detalhes
router.get('/:id', auth, maintenanceController.getMaintenance);

// PUT /api/maintenances/:id -> atualizar
router.put('/:id', auth, maintenanceController.updateMaintenance);

// DELETE /api/maintenances/:id -> deletar
router.delete('/:id', auth, maintenanceController.deleteMaintenance);

// GET /api/maintenances/kpis -> KPIs simples
router.get('/stats/kpis', auth, maintenanceController.kpis);

// exportar router
module.exports = router;
