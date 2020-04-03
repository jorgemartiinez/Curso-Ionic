/* ARCHIVO PRINCIPAL DEL SERVIDOR, se encargará de establecer las bases para el funcionamiento del mismo */

import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import postRoutes from './routes/post';
import cors from 'cors';

const server = new Server();

// Body Parser, para tratar las request como un objeto json
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// File Upload
server.app.use(fileUpload({ useTempFiles: true }));

// Configurar cors
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de mi app, indicamos el prefijo y las rutas que vamos a utilizar
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

// conectar DB
mongoose.connect(
    'mongodb://localhost:27017/fotosgram', // esto creará la bd fotosgram
    { useNewUrlParser: true, useCreateIndex: true }, // importante
    (error) => {
        if (error) throw error;
        console.log('Base de datos ONLINE'); // si todo OK veremos esto por consola
    }
);

//levantar express
server.start(() => {
    console.log('Servidor a full en puerto', server.port);
});
