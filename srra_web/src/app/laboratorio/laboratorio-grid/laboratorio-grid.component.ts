import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { LaboratorioService } from '../laboratorio.service';


@Component({
  selector: 'app-laboratorio-grid',
  templateUrl: './laboratorio-grid.component.html',
  styleUrls: ['./laboratorio-grid.component.scss']
})
export class LaboratorioGridComponent implements OnInit {

  laboratorios: any = [];

  constructor(
    private laboratorioService: LaboratorioService,
    private snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this.selecionar();
  }

  selecionar(): any {
    this.laboratorioService.selecionar().subscribe( data => {
      this.laboratorios = data;
    });
  }

  deletar(id): any {
    this.laboratorioService.deletar(id)
      .then( () => {
        this.snackbar.open('Deletado com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch( () => {
        this.snackbar.open('Erro ao Deletar!', 'Fechar', { duration: 3000 });
      });
  }

}
