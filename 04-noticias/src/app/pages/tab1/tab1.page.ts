import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../models/interfaces';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  @ViewChild(IonContent, {static: false}) content: IonContent;

  constructor(private noticiasService: NoticiasService) {
  }

  ngOnInit(): void {
   this.cargarNoticias();
  }

  loadData( event ) {
    this.cargarNoticias( event );
  }

  ionSelected() {
     this.content.scrollToTop(); // 300ms
  }

  cargarNoticias( event? ) {
    this.noticiasService.getTopHeadlines()
        .subscribe((resp) => {
          this.noticias.push(... resp.articles); // extrae las noticias y las añade 1 a 1 );

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
