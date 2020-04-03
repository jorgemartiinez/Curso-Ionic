import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { IonList, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  usuarios: Observable <any>;

  @ViewChild( IonList, { static: false } ) ionList: IonList;
  constructor(private dataService: DataService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.usuarios = this.dataService.getUsers();
  }

  favorite( user ) {
    console.log('favorite' + user);
    this.presentToast('Guardado en favoritos!');
    this.ionList.closeSlidingItems();
  }

  share( user ) {
    console.log('share' + user);
    this.presentToast('Compartido!');
    this.ionList.closeSlidingItems();
  }

  unread( user ) {
    console.log('unread' + user);
    this.presentToast('Borrado!');
    this.ionList.closeSlidingItems();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
       message,
      duration: 2000
    });
    toast.present();
  }

}
