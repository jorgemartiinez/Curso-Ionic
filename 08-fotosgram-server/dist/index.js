"use strict";
/* ARCHIVO PRINCIPAL DEL SERVIDOR, se encargará de establecer las bases para el funcionamiento del mismo */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var usuario_1 = __importDefault(require("./routes/usuario"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var post_1 = __importDefault(require("./routes/post"));
var cors_1 = __importDefault(require("cors"));
var server = new server_1.default();
// Body Parser, para tratar las request como un objeto json
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// File Upload
server.app.use(express_fileupload_1.default({ useTempFiles: true }));
// Configurar cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de mi app, indicamos el prefijo y las rutas que vamos a utilizar
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
// conectar DB
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', // esto creará la bd fotosgram
{ useNewUrlParser: true, useCreateIndex: true }, // importante
function (error) {
    if (error)
        throw error;
    console.log('Base de datos ONLINE'); // si todo OK veremos esto por consola
});
//levantar express
server.start(function () {
    console.log('Servidor a full en puerto', server.port);
});
