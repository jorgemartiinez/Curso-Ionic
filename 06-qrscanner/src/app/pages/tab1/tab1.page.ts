import { DataLocalService } from './../../services/data-local.service';
import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  constructor(private barcodeScanner: BarcodeScanner,
    private dataLocal: DataLocalService,
  ) { }

  /* ionViewWillEnter() { // la pagina va a cargar
    // console.log('viewWillEnter');
  }

  ionViewDidEnter() { // cuando la vista ya es cargada
    console.log('viewDidEnter');
    this.scan();
  }

  ionViewWillLeave() { // antes de cerrar la vista
    console.log('viewDidLeave');
  }

  ionViewDidLeave() { // al cerrar vista
    console.log('viewDidLeave');
  } */

  scan() {


    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (!barcodeData.cancelled) {
        this.dataLocal.guardarRegistro(barcodeData.format, barcodeData.text);
      }
    }).catch(err => {
      console.log('Error', err);
      // this.dataLocal.guardarRegistro ( 'QRCode', 'https://fernando-herrera.com' );
      this.dataLocal.guardarRegistro('QRCode', 'geo:40.73151796986687,-74.06087294062502');
    });
  }
}
