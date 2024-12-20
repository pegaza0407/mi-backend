// importar el modulo expres para crear rutas y manejar solicitudes
const express=require('express');

// importar mongoose para interactuar con Mongodb
const mongoose=require('mongoose');

//crear enrutador de express para definir rutas del usuario
const router=express.Router();

//definir un esquema del usuario utilizando mongoose

const visitarealEsquema =new mongoose.Schema({
        vendedorid:{type:mongoose.Schema.Types.ObjectId,ref:'Vendedores',required:true},
        label_registro:{type:String,required:true},
        fechavisita:{type:Date,required:true},
        
});

//crear modelo usuario basado en el esquema definido.

const Modvisitavendedor=mongoose.model('vendedoresvisista',visitarealEsquema);

//ruta POST crear un nuevo usuario.

router.post('/',async(req,res)=>{

    try{
        //crear  un usuario basado en los datos enviados en el cuerpo de la solicitud
     const visitapost=new Modvisitavendedor(req.body);
     // guarda el usuario en la base de datos
     await visitapost.save();
     // enviar una respueta con el usuario que creeamos con elcodigo 201 significa se ha creado
        res.status(201).json(visitapost);
    }catch(error){
        // si ocurre un error, enviar un codigo 400 con el mensaje de error
        res.status(400).json({message: error.message});
    }

    

});

router.get('/',async(req,res)=>{
    try{
        const visitapost=await Modvisitavendedor.find();
        res.json(visitapost);

    } catch(error){
        res.status(500).json({message:error.message});
        }

});

router.put('/:id',async(req,res)=>{
    try{
        const visitapost=await Modvisitavendedor.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(visitapost);

    } catch(error){
        res.status(400).json({message:error.message});
        }

});

router.delete('/:id',async(req,res)=>{
    try{
        await Modvisitavendedor.findByIdAndDelete(req.params.id);
        res.json({message:'Visita eliminada'});

    } catch(error){
        res.status(500).json({message:error.message});
        }

});

module.exports=router;