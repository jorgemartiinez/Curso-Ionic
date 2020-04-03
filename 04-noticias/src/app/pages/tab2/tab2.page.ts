import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../models/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService) {}

  ngOnInit() {
    // estado inicial
    this.segment.value = this.categorias[0];
    this.cargarNoticias( this.segment.value );
  }

  cambioCategoria( event ) {
    this.noticias = []; // al cambiar vaciamos las noticias, porque si no las añadiriamos el final
    this.segment.value = event.detail.value;
    this.cargarNoticias( this.segment.value );
  }

  loadData( event ) {
    this.cargarNoticias( this.segment.value, event );
  }

  // filtrar noticias por categoria
  cargarNoticias(categoria: string, event?) {

    this.noticiasService.getTopHeadlinesCategoria( categoria )
        .subscribe( (resp) => {
          console.log(resp);
          this.noticias.push(... resp.articles);

          if ( event ) {
            event.target.complete();
            if ( resp.articles.length === 0 ) {
              console.log('Fin Scroll');
              event.target.disabled = true;
            }
          }

        });
  }
}
