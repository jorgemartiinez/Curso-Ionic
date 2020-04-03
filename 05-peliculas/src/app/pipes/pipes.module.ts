import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { PeliPorGeneroPipe } from './peli-por-genero.pipe';



@NgModule({
  declarations: [ImagenPipe, ParesPipe, PeliPorGeneroPipe],
  exports: [
    ImagenPipe,
    ParesPipe,
    PeliPorGeneroPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
