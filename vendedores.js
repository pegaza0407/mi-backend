// importar el modulo expres para crear rutas y manejar solicitudes
const express=require('express');

// importar mongoose para interactuar con Mongodb
const mongoose=require('mongoose');

//crear enrutador de express para definir rutas del usuario
const router=express.Router();

//definir un esquema del usuario utilizando mongoose

const vendedoresEsquema =new mongoose.Schema({
    peg_num_clien:{type:String,required:true},
    peg_nom_clien:{type:String,required:true},
    peg_ciu_clien:{type:String,required:true},
    peg_est_clien:{type:String,required:true},
    peg_nom_enc_clien:{type:String,required:true},
    peg_tel_clien:{type:String,required:true},
    peg_tex_clien:{type:String,required:true},
    peg_ima_clien:{type:String,required:true},
    peg_sino_clien:{type:Boolean,required:true},
    peg_ubi_clien:{type:String,required:true},
    



      //  nom_ferre:{type:String,required:true},
       // ciudad:{type:String,required:true},
       // estado:{type:String,required:true},
       // nombreencargado:{type:String,required:true},
       // telefono:{type:String,required:true},
        //label_registro:{type:String,required:true},
        //fechavisita:{type:Date,required:true},
       // imagen:{type:String,required:true},
});

//crear modelo usuario basado en el esquema definido.

const Vendedores=mongoose.model('Vendedores',vendedoresEsquema);

//ruta POST crear un nuevo usuario.

router.post('/',async(req,res)=>{

    try{
        //crear  un usuario basado en los datos enviados en el cuerpo de la solicitud
     const vendedorpost=new Vendedores(req.body);
     // guarda el usuario en la base de datos
     await vendedorpost.save();
     // enviar una respueta con el usuario que creeamos con elcodigo 201 significa se ha creado
        res.status(201).json(vendedorpost);
    }catch(error){
        // si ocurre un error, enviar un codigo 400 con el mensaje de error
        res.status(400).json({message: error.message});
    }

    

});

router.get('/',async(req,res)=>{
    try{
        const vendedorpost=await Vendedores.find();
        res.json(vendedorpost);

    } catch(error){
        res.status(500).json({message:error.message});
        }

});

router.put('/:id',async(req,res)=>{
    try{
        const vendedorpost=await Vendedores.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(vendedorpost);

    } catch(error){
        res.status(400).json({message:error.message});
        }

});

router.delete('/:id',async(req,res)=>{
    try{
        await Vendedores.findByIdAndDelete(req.params.id);
        res.json({message:'Visita eliminada'});

    } catch(error){
        res.status(500).json({message:error.message});
        }

});

module.exports=router;
