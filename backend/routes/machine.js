const express = require('express');
const mongoose = require('mongoose');
const Maquina = require('../model/Maquina')

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { nome, tipo, status, ultimaManutencao, proximaManutencao } = req.body;
        const novaMaquina = await Maquina.create({ nome, tipo, status, ultimaManutencao, proximaManutencao });
        res.status(201).json(novaMaquina);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const maquinas = await Maquina.find();
        res.json(maquinas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req,res) => {
    try{ 
        const maquina = await Maquina.findById(req.params.id);
        if (!maquina) return res.status(400).json({mesagem: 'Maquina não encontrada'});
        res.json(maquina);
    } catch(err) {
        res.status(500).json({erro: err.message});
    }
});

router.put('/:id', async(req, res) =>{
    try {
        const {nome, tipo, status, ultimaManutencao, proximaManutencao} = req.body;
        const maquinaAtualiza = await Maquina.findById(req.params.id, 
            { nome, tipo, status, ultimaManutencao, proximaManutencao},
            {new: true}
        );
        if (!maquinaAtualiza) return res.status(404).json({mensagem: 'Maquina não encontrada'});
        res.json(maquinaAtualiza);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

router.delete('/:id', async (req, res) =>{
    try {
        const maquinaDelete = await Maquina.findByIdAndDelete(req.params.id);
        if (!maquinaDelete) return res.status(404).json({mesagem: 'Maquina não encontrada'});
        res.json({mesagem: 'Maquina deletada com sucesso'});
    } catch (err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;