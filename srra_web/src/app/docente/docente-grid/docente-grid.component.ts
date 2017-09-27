import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DocenteService } from '../docente.service';

@Component({
  selector: 'app-docente-grid',
  templateUrl: './docente-grid.component.html',
  styleUrls: ['./docente-grid.component.scss']
})
export class DocenteGridComponent implements OnInit {

  docentes: any = [];

  constructor(private docenteService: DocenteService) { }

  ngOnInit() {
    this.getDocentes();
  }

  getDocentes(): any {
    this.docenteService.getDocentes().subscribe( data => {
      this.docentes = data;
    });
  }

  deleteDocente(id): any {
    console.log(id);
    this.docenteService.deleteDocente(id);
  }

}
