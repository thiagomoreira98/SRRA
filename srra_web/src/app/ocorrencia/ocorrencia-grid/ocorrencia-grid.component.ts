import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { OcorrenciaService } from '../ocorrencia.service';

import { NavComponent } from '../../nav/nav.component';


@Component({
  selector: 'app-ocorrencia-grid',
  templateUrl: './ocorrencia-grid.component.html',
  styleUrls: ['./ocorrencia-grid.component.scss']
})
export class OcorrenciaGridComponent implements OnInit {

  ocorrencias: any = [];

  constructor(
    private ocorrenciaService: OcorrenciaService,
    private navComponent: NavComponent
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Ocorrências');
    this.selecionar();
  }

  selecionar(): any {
    this.ocorrenciaService.selecionar().subscribe( data => {
      this.ocorrencias = data;
    });
  }

  deletar(id): any {
    console.log(id);
    this.ocorrenciaService.deletar(id);
  }
}
