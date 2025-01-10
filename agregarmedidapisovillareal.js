const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const agregarmedidapisovillarealEsquema = new mongoose.Schema({

    medidaagregar_villa_productos:{type:String,required:true};
    coloragregar_villa_productos:{type:String,required:true};
    cajaagregarmedida_villa_productos:{type:String,required:true};
    proveedoragregarnom_villa_productos:{type:String,required:true};
    tipoagregar_villa_productos:{type:String,required:true};
});

const Modagregarmedidapisovillareal = mongoose.model('Villarealagregardatos', agregarmedidapisovillarealEsquema);

router.post('/', async (req, res) => {
    try {
        const vendedorpost = new Modagregarmedidapisovillareal(req.body);
        await vendedorpost.save();
        res.status(201).json(vendedorpost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const vendedorpost = await Modagregarmedidapisovillareal.find();
        res.json(vendedorpost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const vendedorpost = await Modagregarmedidapisovillareal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(vendedorpost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Modagregarmedidapisovillareal.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;