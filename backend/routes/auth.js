// importar express
const express = require('express');
// criar router
const router = express.Router();
// importar controller auth
const authController = require('../controllers/authController');
// importar validadores
const { registerValidator, loginValidator } = require('../utils/validators');

// rota POST /api/auth/register -> criar usuário
router.post('/register', registerValidator, authController.register);

// rota POST /api/auth/login -> autenticar e receber token
router.post('/login', loginValidator, authController.login);

// exportar router
module.exports = router;
