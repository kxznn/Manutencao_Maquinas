const express = require('express');
const router = express.Router();
const Usuario = require('../model/Usuario')

router.post('/', async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        const salvo = await usuario.save();
        res.status(201).json(salvo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const atualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(atualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ mesagem: 'Usuario não encontrado' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;