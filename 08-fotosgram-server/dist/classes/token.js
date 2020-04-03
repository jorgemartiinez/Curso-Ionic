"use strict";
/* CLASE ESTÁTICA PARA GESTIONAR LOS TOKEN, SERÁ ESTÁTICA PARA ACCEDER AL TOKEN CORRECTAMENTE */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
var Token = /** @class */ (function () {
    function Token() {
    }
    // mandamos la info del user que queremos en el token
    Token.getJwtToken = function (payload) {
        return jwt.sign(
        // recibimos por parametro el payload para generar el token en base a esos datos
        {
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });
    };
    Token.comprobarToken = function (userToken) {
        var _this = this;
        // el jwt trabaja con callbacks peros nosotros queremos trabajar con promesas
        return new Promise(function (resolve, reject) {
            jwt.verify(userToken, _this.seed, function (err, decoded) {
                if (err) {
                    // no confiar
                    reject();
                }
                else {
                    // token valido
                    resolve(decoded);
                }
            });
        });
    };
    Token.seed = 'este-es-el-seed'; // semilla secreta de la app, importante para la seguridad
    Token.caducidad = '30d'; // dias antes de caducar el token
    return Token;
}());
exports.default = Token;
