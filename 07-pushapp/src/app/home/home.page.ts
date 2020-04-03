import { OSNotificationPayload } from "@ionic-native/onesignal/ngx";
import { PushService } from "./../services/push.service";
import { Component, OnInit, ApplicationRef } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  mensajes: OSNotificationPayload[] = [];

  constructor(
    public pushService: PushService,
    private applicationRef: ApplicationRef
  ) {}

  ngOnInit() {
    this.pushService.pushListener.subscribe(noti => {
      this.mensajes.unshift(noti);
      this.applicationRef.tick(); // indicar a angular que haga el ciclo de detección de cambios otra vez
    });
  }

  async ionViewWillEnter() {
    console.log("Will Enter - Cargar mensajes");
    this.mensajes = await this.pushService.getMensajes();
  }

  async borrarMensajes() {
    await this.pushService.borrarMensajes();
    this.mensajes = [];
  }
}
