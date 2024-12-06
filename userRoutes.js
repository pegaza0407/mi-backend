// importar el modulo expres para crear rutas y manejar solicitudes
const express=require('express');

// importar mongoose para interactuar con Mongodb
const mongoose=require('mongoose');

//crear enrutador de express para definir rutas del usuario
const router=express.Router();

//definir un esquema del usuario utilizando mongoose

const userSchema =new mongoose.Schema({
    //campo name es un string y es obligatorio
    name:{type:String,required:true},
    // campo phonenumber es tipo string y es obligatorio
    phonenumber:{type:String,required:true}

});

//crear modelo usuario basado en el esquema definido.

const User=mongoose.model('User',userSchema);

//ruta POST crear un nuevo usuario.

router.post('/',async(req,res)=>{

    try{
        //crear  un usuario basado en los datos enviados en el cuerpo de la solicitud
     const user=new User(req.body);
     // guarda el usuario en la base de datos
     await user.save();
     // enviar una respueta con el usuario que creeamos con elcodigo 201 significa se ha creado
        res.status(201).json(user);
    }catch(error){
        // si ocurre un error, enviar un codigo 400 con el mensaje de error
        res.status(400).json({message: error.message});
    }

    

});

router.get('/',async(req,res)=>{
    try{
        const users=await User.find();
        res.json(users);

    } catch(error){
        res.status(500).json({message:error.message});
        }

});

router.put('/:id',async(req,res)=>{
    try{
        const users=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(users);

    } catch(error){
        res.status(400).json({message:error.message});
        }

});

router.delete('/:id',async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json({message:'Usuario eliminado'});

    } catch(error){
        res.status(500).json({message:error.message});
        }

});

module.exports=router;

