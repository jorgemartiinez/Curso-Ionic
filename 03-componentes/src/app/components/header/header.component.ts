import { Component, Input, OnInit } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string;

  constructor() { }

  ngOnInit() { }

}
