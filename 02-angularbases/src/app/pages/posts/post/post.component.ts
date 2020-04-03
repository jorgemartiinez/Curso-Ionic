import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post;
  @Output() clickPost = new EventEmitter ();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.clickPost.emit({ id: this.post.id } );
  }
}
