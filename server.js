// importar el modulo express para crea el servidor
const express=require('express');
// importar mongoose para conectarse a mongoDB
const mongoose=require('mongoose');
// importar el cors para permitir solicitudes de otros origenes.
const cors=require('cors');
// impotar donten para cargar variables de entorno desde un archivo '.env'.
require('dotenv').config();


// crear instancia de la aplicacion express
const app=express();
//middleware para habilitarse cors

app.use(cors());

// midleares para analizar las solicitudes en formato jason
app.use(express.json());

//conexion a mongoDB utilizando las credeciales de entorno.

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })

// si la conexion es exitosa, mostrar un mensaje en la consola

.then(()=>console.log('conectado a mongodb'))

// si ocurre un error en la conexion, mostrar y parar el proceso
.catch(err=>{
    console.error('error de conexion a mongodb',err);
    process.exit(1); // salir del proceso con un codigo de error

});

// importar las rutas de  los usuarios desde el archivo user router.

const usuariosRoutes=require('./userRoutes');
const visitasRoutes=require('./userRoutes');

// usar rutas

app.use('/',usuariosRoutes);
app.use('/',visitasRoutes);

// Definir el puerto donde se ejecuta el servidor (por defecto 5000).

const PORT = process.env.PORT || 5000;

// INICIAR EL servicidor y escuhar en el puerto defenido.

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);

});

