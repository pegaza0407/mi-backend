const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cloudinary = require('./cloudinary');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const villarealaregreapisoEsquema = new mongoose.Schema({
    num_villa_productos: { type: String, required: true },
    medida_vila_productos: { type: String, required: true },
    nombre_villa_productos: { type: String, required: true },
    color_villa_productos: { type: String, required: true },
    cajamedida_villa_productos: { type: String, required: true },
    preciometro_villa_productos: { type: String, required: true },
    preciocaja_villa_productos: { type: String, required: true },
    preciometropub_villa_productos: { type: String, required: true },
    preciocajpub_villa_productos: { type: String, required: true },
    proveedornom_villa_productos: { type: String, required: true },
    imagen_villa_productos: { type: String, required: true },
    tipo_villa_productos: { type: String, required: true },
    inventario_villa_productos: { type: String },
    inventario_villa_productos2: { type: String },
});

const ModVillarealagregarpisos = mongoose.model('Villarealagregarpisos', villarealaregreapisoEsquema);

router.post('/', upload.single('imagen_villa_productos'), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No se ha proporcionado ninguna imagen');
        }

        // Convert buffer to base64
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        
        // Upload to Cloudinary using data URI
        const result = await cloudinary.uploader.upload(dataURI, {
            resource_type: 'auto',
            folder: 'villareal_pisos',
        });

        // Create new document with Cloudinary URL
        const vendedorpost = new ModVillarealagregarpisos({
            ...req.body,
            imagen_villa_productos: result.secure_url
        });

        // Save to database
        await vendedorpost.save();

        // Send response
        res.status(201).json(vendedorpost);
    } catch (error) {
        console.error('Error detallado:', error);
        res.status(500).json({ 
            message: 'Error al procesar la solicitud', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
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