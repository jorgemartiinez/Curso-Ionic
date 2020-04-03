import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage,
              private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }


  guardarPelicula( pelicula: PeliculaDetalle,
  ) {

    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if ( existe ) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos';
    }

    this.presentToast( mensaje);

    this.storage.set('peliculas', this.peliculas);
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas'); // esperamos a obtener las movies
    this.peliculas = peliculas || []; // si peliculas esta vacio, asigna []
    return this.peliculas;
  }

  async existePelicula(id) {
    id = Number(id);

    await this.cargarFavoritos(); // esperamos a cargar las peliculas
    const existe = this.peliculas.find(peli => peli.id === id);

    return (existe) ? true : false; // si existe devuelve true, si no false
  }

  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
