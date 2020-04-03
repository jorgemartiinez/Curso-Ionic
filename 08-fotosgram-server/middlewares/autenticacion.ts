/* MIDDLEWARE, ES SOLO UNA FUNCIÓN QUE LLAMAREMOS ANTES DE LA RUTA */

import { Response, Request, NextFunction } from 'express';
import Token from '../classes/token';

export const verificaToken = ( req: any, res: Response, next: NextFunction ) => {

    const userToken = req.get('x-token') || ''; // para recibir el token lo enviaremos con ese nombre

    Token.comprobarToken( userToken )
    .then( (decoded: any) => {
        req.usuario = decoded.usuario;
        next(); // puedes continuar con el siguiente paso
    } )
    .catch( err => {
        res.json(
            {
                ok: false,
                mensaje: 'El token no es correcto'
            }
        )
    })
};