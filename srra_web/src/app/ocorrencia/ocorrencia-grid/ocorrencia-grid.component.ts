import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
import { OcorrenciaService } from '../ocorrencia.service';

@Component({
  selector: 'app-ocorrencia-grid',
  templateUrl: './ocorrencia-grid.component.html',
  styleUrls: ['./ocorrencia-grid.component.scss']
})
export class OcorrenciaGridComponent implements OnInit {

  ocorrencias: any = [];
  filtro: Number;

  constructor(
    private navComponent: NavComponent,
    private ocorrenciaService: OcorrenciaService, 
    private snackbar: MatSnackBar
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
    this.ocorrenciaService.deletar(id).then( (res: any) => {
      this.snackbar.open(res.message, 'Fechar', { duration: 3000 })
      this.selecionar();
    })
    .catch( (res: any) => {
      this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 })
    })
  }
}
