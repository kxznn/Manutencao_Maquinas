// importar express
const express = require('express');
// criar router
const router = express.Router();
// importar controller de máquinas
const machineController = require('../controllers/machineController');
// importar middleware auth para proteger rotas
const auth = require('../middlewares/Auth');
// importar validator para máquinas
const { machineValidator } = require('../utils/validators');

// GET /api/machines -> listar (público protegido conforme sua escolha)
router.get('/', auth, machineController.listMachines);

// POST /api/machines -> criar máquina (protegido)
router.post('/', auth, machineValidator, machineController.createMachine);

// GET /api/machines/:id -> detalhes da máquina
router.get('/:id', auth, machineController.getMachine);

// PUT /api/machines/:id -> atualizar
router.put('/:id', auth, machineValidator, machineController.updateMachine);

// DELETE /api/machines/:id -> deletar
router.delete('/:id', auth, machineController.deleteMachine);

// exportar router
module.exports = router;
