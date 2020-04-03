import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent {

  @Input() noticia: Article;
  @Input() index: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocal: DataLocalService,
              private platform: Platform
              ) { }
  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url); // con _system se abre el local
  }

  async lanzarMenu() {

    let guardarBorratBtn;
    if ( this.enFavoritos ) {
      guardarBorratBtn =  {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocal.borrarNoticia( this.noticia );
        }
      };
    } else {
      guardarBorratBtn =  {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocal.guardarNoticia( this.noticia );
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Share clicked');
            this.compartirNoticia();
          }
        },
          guardarBorratBtn, // tendrá valor según recibamos o no el boolean de que estamos en favoritos o no
        {
          text: 'Cancelar',
          icon: 'close',
          cssClass: 'action-dark',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  compartirNoticia() {

    if (this.platform.is('cordova')) {
    this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        null,
        this.noticia.url
    );
    } else {
      // @ts-ignore
      if (navigator.share) {
        // @ts-ignore
        navigator.share({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url,
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('No se pudo compartir porque no lo soporta');
      }
    }
  }



}
