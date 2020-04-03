import { Injectable } from '@angular/core';
import { Article } from '../models/interfaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage,
              private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }


  guardarNoticia( noticia: Article ) {
    const existe = this.noticias.find( noti => noti.title === noticia.title);

    if ( !existe ) {
      this.noticias.unshift(noticia); // push al principio
      this.storage.set('favoritos', this.noticias);
    }
    this.mostrarToast('Noticia guardada en favoritos correctamente');
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos'); // esperar a tener los objetos

    if ( favoritos ) {
      this.noticias = favoritos;
    } else {
      this.noticias = [];
    }

  }

  borrarNoticia( noticia: Article ) {
    this.noticias = this.noticias.filter( (noti) => noti.title !== noticia.title  );
    this.storage.set('favoritos', this.noticias);
    this.mostrarToast('Noticia borrada correctamente');
  }

  async mostrarToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    return toast.present();
  }
}
