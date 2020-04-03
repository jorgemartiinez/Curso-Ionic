import { File } from "@ionic-native/file/ngx";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { NavController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Registro } from "./../models/registro.model";
import { Injectable } from "@angular/core";
import { EmailComposer } from "@ionic-native/email-composer/ngx";
@Injectable({
  providedIn: "root"
})
export class DataLocalService {
  guardados: Registro[] = [];

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private iab: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer
  ) {
    this.guardados = [];
    this.cargarStorage();
  }

  async guardarRegistro(format: string, text: string) {
    await this.cargarStorage();

    const nuevoRegistro = new Registro(format, text);

    this.guardados.unshift(nuevoRegistro); // lo añadimos al principio;
    this.storage.set("registros", this.guardados);

    this.abrirRegistro(nuevoRegistro);

    console.log("Guardados", this.guardados);
  }

  async cargarStorage() {
    this.guardados = (await this.storage.get("registros")) || [];
  }

  abrirRegistro(registro: Registro) {
    this.navCtrl.navigateForward("/tabs/tab2");
    switch (registro.type) {
      case "http":
        this.iab.create(registro.text, "_system");
        break;
      case "geo":
        this.navCtrl.navigateForward(`tabs/tab2/mapa/${registro.text}`);
        break;
      default:
        break;
    }
  }

  enviarCorreo() {
    // primero queremos formatear el texto que servirá de csv (cada COMA es una nueva columna)
    const arrTemp = [];
    const titulos = "Tipo, Formato, Creado en, Texto\n";

    arrTemp.push(titulos);

    this.guardados.forEach(registro => {
      // tslint:disable-next-line: max-line-length
      const linea = `${registro.type}, ${registro.format}, ${
        registro.created
      }, ${registro.text.replace(",", " ")}\n`; // quitamos la coma del geo para que no se piense que es una nueva linea, hacemos salto de linea
      arrTemp.push(linea);
    });

    console.log(arrTemp.join(""));

    this.crearArchivoFisico(arrTemp.join(""));
  }

  crearArchivoFisico(text: string) {
    this.file
      .checkFile(this.file.dataDirectory, "registros.csv")
      .then(existe => {
        console.log("Existe archivo?", existe);
        return this.escribirEnArchivo(text);
      })
      .catch(err => {
        return this.file
          .createFile(this.file.dataDirectory, "registros.csv", false)
          .then(creado => this.escribirEnArchivo(text))
          .catch(err2 => console.log("No se pudo crear el archivo", err2));
      });
  }

  async escribirEnArchivo(texto: string) {
    await this.file.writeExistingFile(
      this.file.dataDirectory,
      "registros.csv",
      texto
    );

    const archivo = `${this.file.dataDirectory}/registros.csv`;

    const email = {
      to: "jorgemartiinez19@gmail.com",
      //cc: 'jorgemartiinez19@gmail.com',
      //bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [archivo],
      subject: "Backup de scans",
      body: "Aquí tienes tus backups de los scans <strong>Scanapp</strong>",
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);
  }
}
