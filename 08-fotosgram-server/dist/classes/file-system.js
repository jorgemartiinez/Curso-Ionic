"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var uniqid_1 = __importDefault(require("uniqid"));
var FileSystem = /** @class */ (function () {
    function FileSystem() {
    }
    FileSystem.prototype.guardarImagenTemporal = function (file, userID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Crear carpetas
            var path = _this.crearCarpetaUsuario(userID);
            // Nombre archivo
            var nombreArchivo = _this.generarNombreUnico(file.name);
            // Mover el archivo a la carpeta temp
            file.mv(path + "/" + nombreArchivo, function (err) {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    };
    FileSystem.prototype.generarNombreUnico = function (nombreOriginal) {
        var nombreArr = nombreOriginal.split('.');
        var extension = nombreArr[nombreArr.length - 1]; // en js es base 1
        var idUnico = uniqid_1.default(); // libreria para generar id unico
        return idUnico + "." + extension;
    };
    FileSystem.prototype.crearCarpetaUsuario = function (userId) {
        var pathUser = path_1.default.resolve(__dirname, '../uploads', userId); // crear path
        var pathUserTemp = pathUser + '/temp';
        var existe = fs_1.default.existsSync(pathUser); // comprobamos si existe la ruta
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    };
    FileSystem.prototype.imagenesDeTempHaciaPost = function (userId) {
        var pathTemp = path_1.default.resolve(__dirname, '../uploads', userId, 'temp'); // crear path
        var pathPost = path_1.default.resolve(__dirname, '../uploads', userId, 'posts'); // crear path
        if (!fs_1.default.existsSync(pathTemp)) {
            return []; // no devuelve imagenes, no está creada la carpeta
        }
        if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        var imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach(function (imagen) {
            fs_1.default.renameSync(pathTemp + "/" + imagen, pathPost + "/" + imagen);
        });
        return imagenesTemp;
    };
    FileSystem.prototype.obtenerImagenesEnTemp = function (userId) {
        var pathTemp = path_1.default.resolve(__dirname, '../uploads', userId, 'temp'); // crear path
        return fs_1.default.readdirSync(pathTemp) || [];
    };
    FileSystem.prototype.getFotoUrl = function (userId, img) {
        // Path Posts
        var pathFoto = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts', img);
        var existe = fs_1.default.existsSync(pathFoto);
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/default.jpg');
        }
        return pathFoto;
    };
    return FileSystem;
}());
exports.default = FileSystem;
