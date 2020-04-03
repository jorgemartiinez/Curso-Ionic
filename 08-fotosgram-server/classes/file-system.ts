import FileUpload from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {
    constructor() {}

    guardarImagenTemporal(file: FileUpload, userID: string) {
        return new Promise((resolve, reject) => { // devuelve una promesa por que el metodo de mover archivo funciona con callbacks y queremos esperar desde el post a que se mueva el archivo antes de la respuesta
            // Crear carpetas
            const path = this.crearCarpetaUsuario(userID);

            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);

            // Mover el archivo a la carpeta temp
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    private generarNombreUnico(nombreOriginal: string) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1]; // en js es base 1

        const idUnico = uniqid(); // libreria para generar id unico

        return `${idUnico}.${extension}`;
    }

    private crearCarpetaUsuario(userId: string) {
        const pathUser = path.resolve(__dirname, '../uploads', userId); // crear path
        const pathUserTemp = pathUser + '/temp';

        const existe = fs.existsSync(pathUser); // comprobamos si existe la ruta

        if (!existe) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }

        return pathUserTemp;
    }

    imagenesDeTempHaciaPost(userId: string){
        const pathTemp = path.resolve(__dirname, '../uploads', userId, 'temp'); // crear path
        const pathPost = path.resolve(__dirname, '../uploads', userId, 'posts'); // crear path

        if( !fs.existsSync(pathTemp)){
            return []; // no devuelve imagenes, no está creada la carpeta
        }

        if( !fs.existsSync(pathPost)){
           fs.mkdirSync(pathPost);
        }

        const imagenesTemp = this.obtenerImagenesEnTemp(userId);

        imagenesTemp.forEach( imagen => {
            fs.renameSync( `${pathTemp}/${imagen}`, `${pathPost}/${imagen}` )
        })

        return imagenesTemp;
    }

    private obtenerImagenesEnTemp ( userId: string ){

        const pathTemp = path.resolve( __dirname, '../uploads', userId, 'temp' ); // crear path

        return fs.readdirSync( pathTemp ) || [];
    }


    getFotoUrl(userId:string, img:string) {

        // Path Posts
        const pathFoto = path.resolve ( __dirname, '../uploads/', userId, 'posts', img);

        const existe = fs.existsSync(pathFoto);

        if(!existe) {
            return path.resolve( __dirname, '../assets/default.jpg');
        }

        return pathFoto;
    }
}
