import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-reorder',
  templateUrl: './list-reorder.page.html',
  styleUrls: ['./list-reorder.page.scss'],
})
export class ListReorderPage implements OnInit {


  personajes = ['Aquaman', 'Superman', 'Batman', 'Flash', 'El paticas'];

  constructor() { }

  ngOnInit() {
  }


  reorder(event) {
    console.log(event);

    const itemMover = this.personajes.splice(event.detail.from, 1)[0];
    // eliminamos el elemento del array ya que tenemos su from y lo obtenemos

    this.personajes.splice(event.detail.to, 0, itemMover);
    // añadimos el elemento borrado anteriormente a su to, en este no queremos borrar ninguno

    event.detail.complete();
  }

  onClick() {
    console.log(this.personajes);
  }

}
