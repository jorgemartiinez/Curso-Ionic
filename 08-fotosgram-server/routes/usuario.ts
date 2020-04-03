import { verificaToken } from './../middlewares/autenticacion';
import { Usuario } from './../models/usuario.model';
import { Router, Request, Response, response } from 'express';
import bcryptjs from 'bcryptjs';
import Token from '../classes/token';

const userRoutes = Router();

// LOGIN
userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;

    Usuario.findOne({ email: body.email }, (err, userDB) => {
        if (err) throw err;

        if (!userDB) {
            // si no existe el usuario
            return res.json({
                ok: false,
                mensaje: 'Usuario/contrasñea no son correctos'
            });
        }

        // si llegamos aqui si existe el email, ahora comprobamos la password con nuestro método creado en el modelo user

        if (userDB.compararPassword(body.password)) {
            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            return res.json({
                ok: true,
                token: tokenUser
            });
        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctos'
            });
        }
    });
});

// CREAR USUARIO
userRoutes.post('/create', (req: Request, res: Response) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.nombre,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.body.avatar
    };

    Usuario.create(user)
        .then((userDB) => {
            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            return res.json({
                ok: true,
                token: tokenUser
            });
        })
        .catch((err) => {
            res.json({
                ok: false,
                err
            });
        });
});

// Actualizar usuario

userRoutes.post('/update', verificaToken, (req: any, res: Response) => {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar
    };

    Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userDB) => {
        if (err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese id'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        return res.json({
            ok: true,
            token: tokenUser
        });
    });
});

userRoutes.get('/', [ verificaToken ], (req: any, res: Response) => {
    const usuario = req.usuario;

    res.json({
        ok: true,
        usuario
    });
});

export default userRoutes;
