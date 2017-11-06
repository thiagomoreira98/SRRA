import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { RecursoService } from '../recurso.service';
import { NavComponent } from '../../nav/nav.component';

@Component({
  selector: 'app-recurso-grid',
  templateUrl: './recurso-grid.component.html',
  styleUrls: ['./recurso-grid.component.scss']
})

export class RecursoGridComponent implements OnInit {

  recursos: any = [];
  filtro: any = {};

  constructor(
    private recursoService: RecursoService,
    private snackbar: MatSnackBar,
    private navComponent: NavComponent
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Recursos');
    this.selecionar();
  }

  filtrar() {

  }

  selecionar(): any {
    this.recursoService.selecionar().subscribe(data => {
      this.recursos = data;
    });
  }

  deletar(id): any {
    this.recursoService.deletar(id)
      .then(() => {
        this.snackbar.open('Deletado com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch(() => {
        this.snackbar.open('Erro ao Deletar!', 'Fechar', { duration: 3000 });
      });
  }
}
