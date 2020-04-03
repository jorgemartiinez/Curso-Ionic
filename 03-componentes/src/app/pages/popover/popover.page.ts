import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../../components/popinfo/popinfo.component';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(private popOverCtrl: PopoverController) { }

  ngOnInit() {
  }

  async mostrarPop( evento ) {
      const popover = await this.popOverCtrl.create({
        component: PopinfoComponent,
        event: evento,
        mode: 'ios',
        backdropDismiss: false
      });

      await popover.present();

      // const { data } = await popover.onDidDismiss(); // asignamos al objeto data el resultado que cuando se cierre el popover
      const { data } = await popover.onWillDismiss(); // asignamos al objeto data el resultado cuando se vaya a cerrar (antes que el onDid)

      console.log('Padre', data);

  }

}
