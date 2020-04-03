import { UiServiceService } from './../../services/ui-service.service';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: [ './login.page.scss' ]
})
export class LoginPage implements OnInit {
    @ViewChild('slidePrincipal', { static: true })
    slides: IonSlides;

    mainSlide = {
        allowSlidePrev: false,
        allowSlideNext: false
    };

    loginUser = {
        email: 'jorgemartiinez19@gmail.com',
        password: '1234'
    };

    registerUser: Usuario = {
        email: 'jorgemartiinez5@gmail.com',
        nombre: 'Jorgete',
        password: 'escorpion'
    };
    constructor(
        private usuarioService: UsuarioService,
        private navCtrl: NavController,
        private uiSevice: UiServiceService
    ) {}

    ngOnInit() {
        this.slides.lockSwipes(true);
    }

    async login(fLogin: NgForm) {
        if (fLogin.invalid) {
            return;
        }

        // tslint:disable-next-line: max-line-length
        const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password); // para no hacer then y catch, simplemente con await obtendremos el resultado de la promesa (true o false en este caso)

        if (valido) {
            this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });
        } else {
            this.uiSevice.alertaInformativa('Usuario y contraseña no son correctos');
        }
    }

    async registro(fRegistro: NgForm) {
        console.log(fRegistro.valid);
        if (fRegistro.invalid) {
            return;
        }
        console.log(this.registerUser);
        const valido = await this.usuarioService.register(this.registerUser);

        if (valido) {
            this.navCtrl.navigateRoot('main/tabs/tab1', { animated: true });
        } else {
            this.uiSevice.alertaInformativa('El usuario ya existe');
        }
    }

    mostrarRegistro() {
        this.slides.lockSwipes(false);
        this.slides.slideTo(0);
        this.slides.lockSwipes(true);
    }

    mostrarLogin() {
        this.slides.lockSwipes(false);
        this.slides.slideTo(1);
        this.slides.lockSwipes(true);
    }
}
