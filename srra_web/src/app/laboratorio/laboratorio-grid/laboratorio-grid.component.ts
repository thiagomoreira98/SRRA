import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LaboratorioService } from '../laboratorio.service';

@Component({
  selector: 'app-laboratorio-grid',
  templateUrl: './laboratorio-grid.component.html',
  styleUrls: ['./laboratorio-grid.component.scss']
})
export class LaboratorioGridComponent implements OnInit {

  laboratorios: any = [];
  
  constructor(private laboratorioService: LaboratorioService) { }

  ngOnInit() {
    this.getLaboratorios();
  }

  getLaboratorios(): any {
    this.laboratorioService.getLaboratorios().subscribe( data => {
      this.laboratorios = data;
    });
  }

  deleteLaboratorio(id): any {
    console.log(id);
    this.laboratorioService.deleteLaboratorio(id);
  }

}
