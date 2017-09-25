import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laboratorio-form',
  templateUrl: './laboratorio-form.component.html',
  styleUrls: ['./laboratorio-form.component.scss']
})
export class LaboratorioFormComponent implements OnInit {

  laboratorio: any = {};

  constructor() { }

  ngOnInit() {
  }

}
