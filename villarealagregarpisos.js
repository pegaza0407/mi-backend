const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cloudinary = require('./cloudinary');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configuración de multer para guardar temporalmente la imagen subida

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

router.post('/', upload.single('imagen_villa_productos'), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No se ha proporcionado ninguna imagen');
        }

        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: 'unsigned_upload',
            allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
        });

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
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
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