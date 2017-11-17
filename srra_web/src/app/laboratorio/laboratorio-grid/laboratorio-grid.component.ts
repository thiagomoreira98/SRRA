import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
import { LaboratorioService } from '../laboratorio.service';

@Component({
  selector: 'app-laboratorio-grid',
  templateUrl: './laboratorio-grid.component.html',
  styleUrls: ['./laboratorio-grid.component.scss']
})
export class LaboratorioGridComponent implements OnInit {

  laboratorios: any = [];
  filtro: any = {};

  constructor(
    private navComponent: NavComponent,
    private laboratorioService: LaboratorioService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Laboratorios');
    this.selecionar();
  }

  selecionar(): any {
    this.laboratorioService.selecionar().subscribe( data => {
      this.laboratorios = data;
    });
  }

  deletar(id): any {
    this.laboratorioService.deletar(id).then( () => {
      this.snackbar.open('Deletado com Sucesso!', 'Fechar', { duration: 3000 });
      this.selecionar();
    })
    .catch( () => {
      this.snackbar.open('Erro ao Deletar!', 'Fechar', { duration: 3000 });
    });
  }

}
