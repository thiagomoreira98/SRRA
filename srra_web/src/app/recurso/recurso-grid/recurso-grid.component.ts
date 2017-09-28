import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { RecursoService } from '../recurso.service';

@Component({
  selector: 'app-recurso-grid',
  templateUrl: './recurso-grid.component.html',
  styleUrls: ['./recurso-grid.component.scss']
})

export class RecursoGridComponent implements OnInit {

  recursos: any = [];

  constructor(
    private recursoService: RecursoService,
    private snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this.selecionar();
  }

  selecionar(): any {
    this.recursoService.selecionar().subscribe( data => {
      this.recursos = data;
    });
  }

  deletar(id): any {
    this.recursoService.deletar(id)
      .then( () => {
        this.snackbar.open('Deletado com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch( () => {
        this.snackbar.open('Erro ao Deletar!', 'Fechar', { duration: 3000 });
      });
  }
}
