import { Pipe, PipeTransform } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';

@Pipe({
  name: 'peliPorGenero'
})
export class PeliPorGeneroPipe implements PipeTransform {

  transform(peliculas: PeliculaDetalle[], genero: Genre): any {
    console.log(peliculas);
    console.log(genero);
  }

}
