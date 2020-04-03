import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../models/interfaces';
import { environment } from '../../environments/environment';


const APIKEY = environment.apiKey;
const APIURL = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': APIKEY
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ) { // con la T especificamos el tipo
    query = APIURL + query;
    return this.http.get<T>( query, { headers } );
  }

  getTopHeadlines() {
    this.headlinesPage++;

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&page=${this.headlinesPage}`);
  }

  getTopHeadlinesCategoria( categoria: string ) {

    if ( this.categoriaActual === categoria) { // si seguimos en la misma categoria, paginamos al la siguiente por categoria
      this.categoriaPage++;
    } else { // si es una cat diferente
      this.categoriaPage = 0;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&category=${ categoria }&page=${ this.categoriaPage }`);
  }

}
