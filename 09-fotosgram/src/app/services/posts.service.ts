import { UsuarioService } from './usuario.service';
import { RespuestaPosts } from './../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from './../interfaces/interfaces';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    paginaPosts = 0;

    nuevoPost = new EventEmitter<Post>();

    constructor(private http: HttpClient, private usuarioService: UsuarioService, private fileTransfer: FileTransfer) {}

    getPosts(pull: boolean = false) {
        if (pull) {
            // si recibimos el pull a true significa que estamos haciendo un refresher y queremos cargarlos todos de nuevo
            this.paginaPosts = 0;
        }

        this.paginaPosts++;
        return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPosts}`);
    }

    crearPost(post) {
        const headers = new HttpHeaders({
            'x-token': this.usuarioService.token
        });

        return new Promise((resolve) => {
            this.http.post(`${URL}/posts`, post, { headers }).subscribe((resp) => {
                this.nuevoPost.emit(resp['post']);
                resolve(true);
            });
        });
    }

    subirImagen(img: string) {
        const options: FileUploadOptions = {
            fileKey: 'image',
            headers: {
                'x-token': this.usuarioService.token
            }
        };

        const fileTransfer: FileTransferObject = this.fileTransfer.create();
        fileTransfer
            .upload(img, `${URL}/posts/upload`, options)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log('error en carga', err);
            });
    }
}
