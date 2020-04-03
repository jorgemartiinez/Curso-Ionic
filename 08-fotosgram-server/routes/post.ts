import { verificaToken } from './../middlewares/autenticacion';
import { Post } from '../models/post.model';
import { Router, Response } from 'express';
import FileUpload from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';

const postRoutes = Router();
const fileSystem = new FileSystem();

//Obtener Post paginados
postRoutes.get('/', async (req: any, res: Response) => {
    let pagina = Number(req.query.pagina) || 1; // obtenemos el numero de página, si no recibimos ninguna, usamos la primera
    let skip = pagina - 1; // una pag menos de la recibida
    skip = skip * 10; // la multiplicamos por 10 para saber cuantos registros nos tenemos que saltar

    const posts = await Post.find()
        .sort({ _id: -1 }) // ordenar de forma descendente
        .skip(skip) // indicamos el numero de registros que queremos que se salte
        .limit(10) // solo queremos los últimos 10
        .populate('usuario', '-password') // queremos obtener el usuario con el mensaje sin tener que realizar dos consultas
        .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });
});

//crear post
postRoutes.post('/', [ verificaToken ], (req: any, res: Response) => {
    const body = req.body;
    body.usuario = req.usuario._id; // obtenemos el id en base al request

    const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
    body.imgs = imagenes;

    Post.create(body)
        .then(async (postDB) => {
            await postDB.populate('usuario', '-password').execPopulate(); // esperamos a recibir la información del usuario para continuar con la ejecución, no pass

            res.json({
                ok: true,
                post: postDB
            });
        })
        .catch((err) => {
            res.json(err);
        });
});

// servicio para subir archivos
postRoutes.post('/upload', [ verificaToken ], async (req: any, res: Response) => {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningún archivo'
        });
    }

    const file: FileUpload = req.files.image;

    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningún archivo - image'
        });
    }

    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No has subido una imagen'
        });
    }

    await fileSystem.guardarImagenTemporal(file, req.usuario._id);

    res.json({
        ok: true,
        file: file.mimetype
    });
});

postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {

    const userId = req.params.id;
    const img = req.params.id;

    const pathFoto = fileSystem.getFotoUrl(userId, img );

    res.sendFile(pathFoto);

});
export default postRoutes;
