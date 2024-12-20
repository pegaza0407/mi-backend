const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const villarealaregreapisoEsquema = new mongoose.Schema({


   
    num_villa_productos:{type:String,required:true},
    medida_vila_productos:{type:String,required:true},
    nombre_villa_productos:{type:String,required:true},
    color_villa_productos:{type:String,required:true},
    cajamedida_villa_productos:{type:String,required:true},
    preciometro_villa_productos:{type:String,required:true},
    preciocaja_villa_productos:{type:String,required:true},
    preciometropub_villa_productos:{type:String,required:true},
    preciocajpub_villa_productos:{type:String,required:true},
    proveedornom_villa_productos:{type:String,required:true},
    imagen_villa_productos:{type:String,required:true},
    tipo_villa_productos:{type:String,required:true},

  
});

const ModVillarealagregarpisos = mongoose.model('Villarealagregarpisos', villarealaregreapisoEsquema);

router.post('/', async (req, res) => {
    try {
        const vendedorpost = new ModVillarealagregarpisos(req.body);
        await vendedorpost.save();
        res.status(201).json(vendedorpost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const vendedorpost = await ModVillarealagregarpisos.find();
        res.json(vendedorpost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const vendedorpost = await ModVillarealagregarpisos.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(vendedorpost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await ModVillarealagregarpisos.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;