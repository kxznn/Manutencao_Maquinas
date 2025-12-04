// importar funções do express-validator
const { body } = require('express-validator');

// validação para registro de usuário
const registerValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars')
];

// validação para login
const loginValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
];

// validação para criar/editar máquina
const machineValidator = [
  body('name').notEmpty().withMessage('Machine name required'),
  body('sector').notEmpty().withMessage('Sector required'),
  body('tag').notEmpty().withMessage('Tag required')
];

// validação para criar manutenção
const maintenanceValidator = [
  body('machine').notEmpty().withMessage('Machine id required'),
  body('description').notEmpty().withMessage('Description required'),
  body('scheduledAt').notEmpty().withMessage('Scheduled date required').isISO8601().toDate()
];

module.exports = {
  registerValidator,
  loginValidator,
  machineValidator,
  maintenanceValidator
};
