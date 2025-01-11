const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const cajamedidaEsquema = new mongoose.Schema({

    cajaagregarmedida_villa_productos:{type:String,required:true},
   
});


const Modelocajamedida = mongoose.model('Cajamedida', cajamedidaEsquema);

router.post('/', async (req, res) => {
    try {
        const vendedorpost = new Modelocajamedida(req.body);
        await vendedorpost.save();
        res.status(201).json(vendedorpost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const vendedorpost = await Modelocajamedida.find();
        res.json(vendedorpost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const vendedorpost = await Modelocajamedida.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(vendedorpost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Modelocajamedida.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;