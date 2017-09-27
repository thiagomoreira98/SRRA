import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { OcorrenciaService } from '../ocorrencia.service';


@Component({
  selector: 'app-ocorrencia-grid',
  templateUrl: './ocorrencia-grid.component.html',
  styleUrls: ['./ocorrencia-grid.component.scss']
})
export class OcorrenciaGridComponent implements OnInit {

  ocorrencias: any = [];
  
  constructor(private ocorrenciaService: OcorrenciaService) { }

  ngOnInit() {
    this.getOcorrencias();
  }

  getOcorrencias(): any {
    this.ocorrenciaService.getOcorrencias().subscribe( data => {
      this.ocorrencias = data;
    });
  }

  deleteOcorrencia(id): any {
    console.log(id);
    this.ocorrenciaService.deleteOcorrencia(id);
  }
}
