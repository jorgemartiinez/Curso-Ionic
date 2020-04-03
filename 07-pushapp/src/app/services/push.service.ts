import { Storage } from '@ionic/storage';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PushService {
    mensajes: OSNotificationPayload[] = [];
    userID: string;

    pushListener = new EventEmitter<OSNotificationPayload>();

    constructor(private oneSignal: OneSignal, private storage: Storage) {
        this.cargarMensajes();
    }

    async getMensajes() {
        await this.cargarMensajes();
        return [ ...this.mensajes ]; // se mande como objeto nuevo, no por referencia
    }

    configuracionInicial() {
        this.oneSignal.startInit('297318cd-5a39-405d-a7c7-b79c4608c9ef', '662917982313');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

        this.oneSignal.handleNotificationReceived().subscribe((noti) => {
            // do something when notification is received
            console.log('Notificacion recibida', noti);
            this.notificacionRecibida(noti);
        });

        this.oneSignal.handleNotificationOpened().subscribe(async (noti) => {
            // do something when a notification is opened
            console.log('Notificacion abierta', noti);
            await this.notificacionRecibida(noti.notification);
        });

        // obtener ID del suscriptor
        this.oneSignal.getIds().then((info) => {
            this.userID = info.userId;
            console.log(this.userID);
        });

        this.oneSignal.endInit();
    }

    async notificacionRecibida(noti: OSNotification) {
        await this.cargarMensajes();

        const payload = noti.payload;
        const existePush = this.mensajes.find((mensaje) => mensaje.notificationID === noti.payload.notificationID);

        if (existePush) {
            return;
        } else {
            this.mensajes.unshift(payload);
            this.pushListener.emit(payload);
            this.guardarMensajes();
        }
    }
    guardarMensajes() {
        this.storage.set('mensajes', this.mensajes); // guardar storage
    }

    async cargarMensajes() {
        this.mensajes = (await this.storage.get('mensajes')) || []; // comprobamos que no devuelva null
        return this.mensajes;
    }

    async borrarMensajes() {
        await this.storage.remove('mensajes');
        this.mensajes = [];
        this.guardarMensajes();
    }
}
