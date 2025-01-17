// importar el modulo expres para crear rutas y manejar solicitudes
const express=require('express');

// importar mongoose para interactuar con Mongodb
const mongoose=require('mongoose');

//crear enrutador de express para definir rutas del usuario
const router=express.Router();
const cloudinary = require('./cloudinary');
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
//definir un esquema del usuario utilizando mongoose

const imagenesEsquema =new mongoose.Schema({
        pisosId:{type:mongoose.Schema.Types.ObjectId,ref:'Villarealagregarpisos',required:true},
        imagen1:{type:String},
        imagen2:{type:String},
        imagen3:{type:String},
        imagen4:{type:String},        
});

//crear modelo usuario basado en el esquema definido.

const Modimagenes=mongoose.model('imagenescinco',imagenesEsquema);

//ruta POST crear un nuevo usuario.

router.post('/', upload.array('imagenes', 4), async (req, res) => {
    try {
        if (req.files.length === 0) {
            throw new Error('No se ha proporcionado ninguna imagen');
        }

        // Crear un array de las imágenes cargadas en Cloudinary
        const uploadedImages = [];

        // Subir las imágenes a Cloudinary
        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = "data:" + file.mimetype + ";base64," + b64;

            // Subir la imagen a Cloudinary
            const result = await cloudinary.uploader.upload(dataURI, {
                resource_type: 'auto',
                folder: 'villareal_pisos',
            });

            // Guardar el URL de la imagen
            uploadedImages.push(result.secure_url);
        }

        // Crear un nuevo documento con las URLs de las imágenes
        const visitapost = new Modimagenes({
            pisosId: req.body.pisosId,
            imagen1: uploadedImages[0] || null,
            imagen2: uploadedImages[1] || null,
            imagen3: uploadedImages[2] || null,
            imagen4: uploadedImages[3] || null,
        });

        // Guardar el documento en la base de datos
        await visitapost.save();

        // Enviar la respuesta
        res.status(201).json(visitapost);
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({
            message: 'Error al procesar la solicitud',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

router.get('/',async(req,res)=>{
    try{
        const visitapost=await Modimagenes.find();
        res.json(visitapost);

    } catch(error){
        res.status(500).json({message:error.message});
        }

});

router.put('/:id',async(req,res)=>{
    try{
        const visitapost=await Modimagenes.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(visitapost);

    } catch(error){
        res.status(400).json({message:error.message});
        }

});

router.delete('/:id',async(req,res)=>{
    try{
        await Modimagenes.findByIdAndDelete(req.params.id);
        res.json({message:'Visita eliminada'});

    } catch(error){
        res.status(500).json({message:error.message});
        }

});

module.exports=router;