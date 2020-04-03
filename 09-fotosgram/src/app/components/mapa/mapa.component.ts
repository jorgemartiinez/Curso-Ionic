import { Component, OnInit, Input, ViewChild } from '@angular/core';

declare var mapboxgl: any;

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: [ './mapa.component.scss' ]
})
export class MapaComponent implements OnInit {
    @Input() coords: string;
    @ViewChild('mapa', {static: true}) mapa;

    constructor() {}

    ngOnInit() {
        console.log(this.coords);

        if (this.coords) {
            const latLng = this.coords.split(',');

            const lat = Number(latLng[0]);
            const lng = Number(latLng[1]);

            mapboxgl.accessToken =
                'pk.eyJ1Ijoiam9yZ2VtYXJ0aWluZXoiLCJhIjoiY2s1eTMzZ3djMG94azNubng5M3V6aDI0cyJ9.HJD7j25fVLqHOoag-oQvsg';
            const map = new mapboxgl.Map({
                container: this.mapa.nativeElement,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [ lng, lat ],
                zoom: 15
            });

            const marker = new mapboxgl.Marker() // añadir marcador al mapa
                .setLngLat([ lng, lat ])
                .addTo(map);
        }
    }
}
