import { Post } from './../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: [ 'tab1.page.scss' ]
})
export class Tab1Page implements OnInit {
    posts: Post[] = [];
    habilitado = true; // propiedad bindeada al infinite scroll para saber como tenemos que cargar los registros con el refresher y el scroll

    constructor(private postService: PostsService) {}

    ngOnInit() {
        this.siguientes();
        this.postService.nuevoPost.subscribe(( post ) => {
            this.posts.unshift( post );
        });
    }

    siguientes(event?, pull: boolean = false) {
        if (pull) {
            // si recibimos el pull y queremos hacer el refresh ya no querremos cargar los siguientes, sino refrescarlos todos
            this.habilitado = true; // volvemos a habilitar el infinite scroll ya que cargaremos de nuevo todos los posts
            this.posts = [];
        }

        this.postService.getPosts(pull).subscribe((resp) => {
            console.log(resp);
            this.posts.push(...resp.posts);
            if (event) {
                event.target.complete();
                if (resp.posts.length === 0) {
                    // si ya no quedan posts que cargar
                    this.habilitado = false; // cancelamos el evento para que no siga haciendo infinite scroll
                }
            }
        });
    }

    recargar(event) {
        this.siguientes(event, true);
    }
}
