/* CLASE DE INICIALIZACIÓN Y CONFIGURACIÓN DEL SERVIDOR */

import express from 'express';

// se le pone default porque en este archivo solo va a ir esta clase
export default class Server {
    public app: express.Application;
    public port: number = 3000;

    constructor() {
        this.app = express();
    }

    start( callback: () => void ) { //pasamos la funcion
        this.app.listen( this.port, callback );
    }

}