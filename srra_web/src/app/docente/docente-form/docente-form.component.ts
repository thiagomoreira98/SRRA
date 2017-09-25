import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docente-form',
  templateUrl: './docente-form.component.html',
  styleUrls: ['./docente-form.component.scss']
})
export class DocenteFormComponent implements OnInit {

  docente: any = [];

  constructor() { }

  ngOnInit() {
  }

}
