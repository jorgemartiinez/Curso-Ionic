/* CLASE ESTÁTICA PARA GESTIONAR LOS TOKEN, SERÁ ESTÁTICA PARA ACCEDER AL TOKEN CORRECTAMENTE */

import * as jwt from 'jsonwebtoken';

export default class Token {
    private static seed: string = 'este-es-el-seed'; // semilla secreta de la app, importante para la seguridad
    private static caducidad: string = '30d'; // dias antes de caducar el token

    constructor() {}

    // mandamos la info del user que queremos en el token
    static getJwtToken(payload: any): string {
        return jwt.sign(
            // recibimos por parametro el payload para generar el token en base a esos datos
            {
                usuario: payload
            },
            this.seed,
            { expiresIn: this.caducidad }
        );
    }

    static comprobarToken(userToken: string) {
        // el jwt trabaja con callbacks peros nosotros queremos trabajar con promesas
        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    // no confiar
                    reject();
                } else {
                    // token valido
                    resolve(decoded);
                }
            });
        });
    }
}
