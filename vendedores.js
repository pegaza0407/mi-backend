const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const vendedoresEsquema = new mongoose.Schema({
    peg_num_clien: { type: String, required: true},
    peg_nom_clien: { type: String, required: true },
    peg_ciu_clien: { type: String, required: true },
    peg_est_clien: { type: String, required: true },
    peg_nom_enc_clien: { type: String, required: true },
    peg_tel_clien: { type: String, required: true },
    peg_tex_clien: { type: String, required: true },
    peg_ima_clien: { type: String, required: true },
    peg_sino_clien: { type: Boolean, required: true },
    peg_ubi_clien: {type: String, required: true }



 
});

const Vendedores = mongoose.model('Vendedores', vendedoresEsquema);

router.post('/', async (req, res) => {
    try {
        const vendedorpost = new Vendedores(req.body);
        await vendedorpost.save();
        res.status(201).json(vendedorpost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const vendedorpost = await Vendedores.find();
        res.json(vendedorpost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const vendedorpost = await Vendedores.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(vendedorpost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Vendedores.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;