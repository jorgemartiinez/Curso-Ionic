import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BusquedaPelicula,
  Genre,
  PeliculaDetalle,
  RespuestaCredits,
  RespuestaGenre,
  RespuestaMDB
} from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const APIKEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private popularesPage = 0;
  generos: Genre[] = [];

  constructor(private http: HttpClient) { }

  getFeature() {

    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate(); // el dia cero es el dia anterior al 1
    const mes = hoy.getMonth() + 1;

    let mesString;

    if ( mes < 10 ) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(`discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  getPopulares() {
    this.popularesPage++; // cada vez que llamemos, cargaremos una pagina nueva
    const query = `discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getPeliculaDetalle(id: string) {
    return this.ejecutarQuery<PeliculaDetalle>(`movie/${id}?a=1`); // se pone el a porque el ejecutar query va a añadir un & despues
  }

  getActoresPelicula(id: string) {
    return this.ejecutarQuery<RespuestaCredits>(`movie/${id}/credits?a=1`); // se pone el a porque el ejecutar query va a añadir un & despues
  }


  getBuscarPeliculas(busqueda: string) {
    return this.ejecutarQuery<BusquedaPelicula>(`search/movie?query=${encodeURI(busqueda)}`);
  }

  cargarGeneros(): Promise<Genre[]> {

    return new Promise(resolve => {
      this.ejecutarQuery(`genre/movie/list?a=1`).subscribe((resp: RespuestaGenre) => {
        this.generos = resp.genres;
        console.log(this.generos);
        resolve(this.generos);
      });
    });


  }

  private ejecutarQuery<T>(query: string) {

    query = `${URL}${query}`;

    query += `&api_key=${ APIKEY }&language=es&include_image_language=es`;

    return this.http.get<T>(query);
  }
}
