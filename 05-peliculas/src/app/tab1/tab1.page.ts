import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    peliculasRecientes: Pelicula[] = [];
    populares: Pelicula[] = [];

    constructor( private moviesService: MoviesService ) {}

    ngOnInit(): void {
        this.moviesService.getFeature().subscribe(
            (respRecientes: RespuestaMDB) => {
                console.log('Peliculas recientes', respRecientes);
                this.peliculasRecientes = respRecientes.results;
            }
        );
        this.getPopulares();
    }

    cargarMas() {
        this.getPopulares();
    }

    getPopulares() {
        this.moviesService.getPopulares().subscribe(
            (respPopulares: RespuestaMDB) => {
                // console.log('Peliculas populares', respPopulares);
                const arrTemp = [...this.populares, ...respPopulares.results];
                this.populares = arrTemp;
            }
        );
    }
}
