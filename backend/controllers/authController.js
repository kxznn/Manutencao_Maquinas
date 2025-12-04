// importar bcrypt para hash e jwt para tokens
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// importar model User
const User = require('../models/User');
// importar função para checar validationResult
const { validationResult } = require('express-validator');

// registrar usuário
exports.register = async (req, res) => {
  try {
    // checar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // retornar erros se houver
      return res.status(400).json({ errors: errors.array() });
    }
    // extrair dados do body
    const { name, email, password } = req.body;
    // checar se já existe usuário com mesmo email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    // criar novo usuário
    const hashed = await bcrypt.hash(password, 10); // hashear senha
    user = new User({ name, email, password: hashed });
    // salvar no banco
    await user.save();
    // criar token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    // retornar dados (sem senha) e token
    return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    // erro genérico
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// login
exports.login = async (req, res) => {
  try {
    // checar validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // extrair dados
    const { email, password } = req.body;
    // buscar usuário
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // comparar senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // gerar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    // retornar token e dados do user
    return res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
