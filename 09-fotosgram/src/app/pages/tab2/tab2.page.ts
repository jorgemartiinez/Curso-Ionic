import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PostsService } from './../../services/posts.service';
import { Post } from './../../interfaces/interfaces';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var window: any; // evitar error de ts

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: [ 'tab2.page.scss' ]
})
export class Tab2Page {
    tempImages: string[] = [];
    post = {
        mensaje: '',
        coords: null,
        posicion: false
    };

    cargandoGeo = false;

    constructor(
        private postService: PostsService,
        private route: Router,
        private geoLocation: Geolocation,
        private camera: Camera
    ) {}

    async crearPost() {
        console.log(this.post);
        const creado = await this.postService.crearPost(this.post);

        this.post = {
            mensaje: '',
            coords: null,
            posicion: false
        };

        this.tempImages = [];

        this.route.navigateByUrl('/main/tabs/tab1');
    }

    getGeo() {
        if (!this.post.posicion) {
            this.post.coords = null;
            return;
        }

        this.cargandoGeo = true;

        this.geoLocation
            .getCurrentPosition()
            .then((resp) => {
                // resp.coords.latitude
                // resp.coords.longitude
                const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
                this.post.coords = coords;
                this.cargandoGeo = false; // ya tenemos las coods
                console.log(this.post.coords);
            })
            .catch((error) => {
                console.log('Error getting location', error);
                this.cargandoGeo = false;
            });

        console.log(this.post);
    }

    camara() {
        const options: CameraOptions = {
            quality: 80,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA // obtenemos foto de la camara
        };

        this.procesarImagen(options);
    }

    libreria() {
        const options: CameraOptions = {
            quality: 80,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY // obtenemos foto de la galería
        };

        this.procesarImagen(options);
    }

    procesarImagen( options: CameraOptions ) {

        this.camera.getPicture(options).then(
            (imageData) => {
                const img = window.Ionic.WebView.convertFileSrc( imageData );
                console.log(img);
                this.tempImages.push(imageData);
            },
            (err) => {
                // Handle error
            }
        );
    }
}
