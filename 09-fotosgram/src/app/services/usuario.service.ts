import { verificaToken } from './../../../../08-fotosgram-server/middlewares/autenticacion';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    token: string = null;
    usuario: Usuario = {};

    constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) {}

     login(email: string, password: string) {
        const data = { email, password };
        // tslint:disable-next-line: max-line-length
        return new Promise((resolve) => {
            // para devolver una respuesta del subscribe, lo metemos dentro de una promesa y devolvemos true cuando inicie sesión y false cuando este mal
            this.http.post(`${URL}/user/login`, data).subscribe(async (resp) => {
                console.log(resp);
                if (resp['ok']) {
                    // contraseña y email ok
                    await this.guardarToken(resp['token']);
                    resolve(true);
                } else {
                    // contraseña o email mal
                    this.token = null;
                    await this.storage.clear();
                    resolve(false);
                }
            });
        });
    }

    actualizarUsuario(usuario: Usuario) {
        const headers = new HttpHeaders({
            'x-token': this.token
        });

        return new Promise((resolve) => {
            this.http.post(`${URL}/user/update`, usuario, { headers }).subscribe((resp) => {
                if (resp['ok']) {
                    this.guardarToken(resp['token']);
                    resolve(true);
                } else {
                    this.storage.clear();
                    resolve(false);
                }
            });
        });
    }
    async guardarToken(token: string) {
        this.token = token;
        await this.storage.set('token', token);
        await this.validaToken();
    }

    register(usuario: Usuario) {
        return new Promise((resolve) => {
            this.http.post(`${URL}/user/create`, usuario).subscribe(async (resp) => {
                console.log(resp);
                if (resp['ok']) {
                    await this.guardarToken(resp['token']);
                    resolve(true);
                } else {
                    this.token = null;
                    this.storage.clear();
                    resolve(false);
                }
            });
        });
    }

    async cargarToken() {
        this.token = (await this.storage.get('token')) || null; // si el token no está en storage, asignale null
    }

    getUsuario() {
        if (!this.usuario._id) {
            this.validaToken();
        }
        return { ...this.usuario }; // rompemos la relación con el this.usuario y enviamos una 'copia sin referencia'
    }

    async validaToken(): Promise<boolean> {
        // indicamos que devolverá una promesa que a su vez devolverá un boolean

        await this.cargarToken();

        if (!this.token) {
            // si no existe el token, devolvemos la promesa a false para que el guard no cargue el login y terminamos la ejecucción
            this.navCtrl.navigateRoot('/login');
            return Promise.resolve(false);
        }

        return new Promise<boolean>((resolve) => {
            const headers = new HttpHeaders({
                'x-token': this.token
            });

            this.http.get(`${URL}/user/`, { headers }).subscribe((resp) => {
                if (resp['ok']) {
                    this.usuario = resp['usuario'];
                    resolve(true);
                } else {
                    this.navCtrl.navigateRoot('/login');
                    resolve(false);
                }
            });
        });
    }

    logout() {
        this.token = null;
        this.usuario = null;
        this.storage.clear();
        this.navCtrl.navigateRoot('/login', { animated: true });
    }
}
