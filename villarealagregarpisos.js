const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cloudinary = require('./cloudinary');
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
    inventario_villa_productos:{type:String},
    inventario_villa_productos2:{type:String},

  
});

const ModVillarealagregarpisos = mongoose.model('Villarealagregarpisos', villarealaregreapisoEsquema);

router.post('/', async (req, res) => {
    try {
        // Obtener la imagen desde el cuerpo de la solicitud
        const image = req.body.imagen_villa_productos; // Asumimos que la imagen está en 'req.body.imagen'

        // Subir la imagen a Cloudinary
        cloudinary.uploader.upload(image, {
            upload_preset: 'unsigned_upload',
            allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
        }, async (error, result) => {
            if (error) {
                return res.status(500).json({ message: 'Error al subir la imagen a Cloudinary', error });
            }

            // La URL de la imagen subida
            const imageUrl = result.secure_url;

            // Crear un nuevo objeto basado en el modelo de Mongoose
            const vendedorpost = new ModVillarealagregarpisos({
                ...req.body,
                imagen_villa_productos: imageUrl // Guardar la URL de la imagen
            });

            // Guardar el nuevo objeto en la base de datos
            await vendedorpost.save();

            // Responder con el objeto guardado
            res.status(201).json(vendedorpost);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
/*
router.post('/', async (req, res) => {
    try {
        const vendedorpost = new ModVillarealagregarpisos(req.body);
        
        await vendedorpost.save();
        res.status(201).json(vendedorpost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
*/
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