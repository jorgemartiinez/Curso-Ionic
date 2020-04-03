import { PostsService } from './../../services/posts.service';
import { UiServiceService } from './../../services/ui-service.service';
import { UsuarioService } from './../../services/usuario.service';
import { OnInit, Input, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: [ 'tab3.page.scss' ]
})
export class Tab3Page implements OnInit {
    usuario: Usuario = {};

    constructor(private usuarioService: UsuarioService, private UiService: UiServiceService, private postService: PostsService) {}

    ngOnInit() {
        this.usuario = this.usuarioService.getUsuario();
        console.log(this.usuario);
    }
    logout() {
        this.usuarioService.logout();
        this.postService.paginaPosts = 0;
    }

    async actualizar(fActualizar: NgForm) {
        if (fActualizar.invalid) {
            return;
        }
        const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);
        console.log(actualizado);
        if (actualizado) {
          this.UiService.presentToast('Registro actualizado');
        } else {
          this.UiService.presentToast('No se pudo actualizar');
        }
    }
}
