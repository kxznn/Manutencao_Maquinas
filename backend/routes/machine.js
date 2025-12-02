const express = require('express');
const mongoose = require('mongoose');
const Machine = require('../models/Machine');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { maquina, id, tipo, status, ultimaManutencao, proximaManutencao } = req.body;
        const newMachine = await Machine.create({maquina, id, tipo, status, ultimaManutencao, proximaManutencao});
        res.status(201).json(newMachine);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const machines = await Machine.find();
        res.json(machines);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

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
        const {maquina, id, tipo, status, ultimaManutencao, proximaManutencao} = req.body;
        const UpdtMachine = await Machine.findById(req.params.id, 
            { maquina, id, tipo, status, ultimaManutencao, proximaManutencao},
            {new: true}
        );
        if (!UpdtMachine) return res.status(404).json({mensagem: 'Maquina não encontrada'});
        res.json(UpdtMachine);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

router.delete('/:id', async (req, res) =>{
    try {
        const DeletMachine = await Machine.findByIdAndDelete(req.params.id);
        if (!DeletMachine) return res.status(404).json({mesagem: 'Maquina não encontrada'});
        res.json({mesagem: 'Maquina deletada com sucesso'});
    } catch (err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;