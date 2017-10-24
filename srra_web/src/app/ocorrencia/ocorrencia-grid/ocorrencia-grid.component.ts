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
    this.ocorrenciaService.deletar(id).then( () => {
      this.snackbar.open('Deletado com Sucesso!', 'Fechar', { duration: 3000 })
    })
    .catch( (err) => {
      this.snackbar.open('Erro ao Deletar!', 'Fechar', { duration: 3000 })
    })
  }
}
