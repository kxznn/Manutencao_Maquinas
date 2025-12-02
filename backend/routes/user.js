const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        const save = await user.save();
        res.status(201).json(save);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

router.get('/', async (req,res) => {
    try {
        const users = await User.find();
        res.json(users); 
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.put('/', async (req, res) => {
    try {
        const Update = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(Update);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ mesagem: 'Usuario não encontrado' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;