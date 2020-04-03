import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  ideas: string[] = ['Spiderman', 'avenger', 'el señor de los anillos', 'la vida es bella'];
  peliculas: Pelicula[] = [];
  loading = false;

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController
  ) {}

  buscar(event) {
    const valor = event.detail.value;
    this.loading = true;

    if (valor.length === 0) { // si esta vacia la string no hacemos nada
      this.loading = false;
      this.peliculas = [];
      return;
    } else {
      this.moviesService.getBuscarPeliculas(event.detail.value).subscribe(
          (data) => {
            this.peliculas = data.results;
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          }
      );
    }}

    async mostrarDetalle(id: number) {
      const modal = await this.modalCtrl.create({
        component: DetalleComponent,
        componentProps: {
          id
        },
      });

      modal.present();
    }
}
