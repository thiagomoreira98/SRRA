import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecursoService } from '../recurso.service';

@Component({
  selector: 'app-recurso-grid',
  templateUrl: './recurso-grid.component.html',
  styleUrls: ['./recurso-grid.component.scss']
})

export class RecursoGridComponent implements OnInit {

  recursos: any = [];

  constructor(private recursoService: RecursoService) { }

  ngOnInit() {
    this.getRecursos();
  }

  getRecursos(): any {
    this.recursoService.getRecursos().subscribe( data => {
      this.recursos = data;
    });
  }

  deleteRecurso(id): any {
    console.log(id);
    this.recursoService.deleteRecurso(id);
  }
}
