import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { DocenteService } from '../docente.service';

@Component({
  selector: 'app-docente-grid',
  templateUrl: './docente-grid.component.html',
  styleUrls: ['./docente-grid.component.scss']
})
export class DocenteGridComponent implements OnInit {

  docentes: any = [];

  constructor(
    private docenteService: DocenteService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.selecionar();
  }

  selecionar(): any {
    this.docenteService.selecionar().subscribe( data => {
      this.docentes = data;
    });
  }

  deletar(id): any {
    this.docenteService.deletar(id)
      .then( () => {
        this.snackbar.open('Deletado Com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch( () => {
        this.snackbar.open('Erro ao Deletar!', 'Fechar', { duration: 3000 });
      });
  }

}
