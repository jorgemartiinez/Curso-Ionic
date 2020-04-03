"use strict";
/* MIDDLEWARE, ES SOLO UNA FUNCIÓN QUE LLAMAREMOS ANTES DE LA RUTA */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = __importDefault(require("../classes/token"));
exports.verificaToken = function (req, res, next) {
    var userToken = req.get('x-token') || ''; // para recibir el token lo enviaremos con ese nombre
    token_1.default.comprobarToken(userToken)
        .then(function (decoded) {
        req.usuario = decoded.usuario;
        next(); // puedes continuar con el siguiente paso
    })
        .catch(function (err) {
        res.json({
            ok: false,
            mensaje: 'El token no es correcto'
        });
    });
};
