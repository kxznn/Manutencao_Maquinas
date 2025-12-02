const express = require('express');
const mongoose = require('mongoose');
const Maintenance = require('../models/Maintenance');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { id, maquina, data, dataConclusao, status} = req.body;
        const newMaintenance = await Maintenance.create({
            id, maquina, 
        })
    }
})