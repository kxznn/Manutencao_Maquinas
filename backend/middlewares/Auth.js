// importar jwt
const jwt = require('jsonwebtoken');
// importar User para possível verificação de existencia se desejar
const User = require('../models/User');

// middleware para proteger rotas e anexar user ao request
const auth = async (req, res, next) => {
  try {
    // pegar token do header Authorization -> 'Bearer token'
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // se não tiver token, negar
      return res.status(401).json({ message: 'Authorization token missing' });
    }
    // extrair token
    const token = authHeader.split(' ')[1];
    // verificar token usando secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // opcional: buscar usuário no banco (pode ser útil para permissões)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    // anexar user à requisição
    req.user = user;
    // continuar fluxo
    next();
  } catch (err) {
    // token inválido ou outro erro
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// exportar middleware
module.exports = auth;
