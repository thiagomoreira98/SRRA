import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { RecursoService } from '../recurso.service';

@Component({
  selector: 'app-recurso-form',
  templateUrl: './recurso-form.component.html',
  styleUrls: ['./recurso-form.component.scss']
})
export class RecursoFormComponent implements OnInit {

  recurso: any = {};

  constructor(
    private recursoService: RecursoService,
    private snackbar: MdSnackBar
  ) { }

  ngOnInit() {
  }

  cadastrar() {
    this.recursoService.inserir(this.recurso)
    .then( () => {
      this.snackbar.open('Cadastrado com Sucesso!', 'Fechar', { duration: 3000 });
    })
    .catch( () => {
      this.snackbar.open('Erro ao Cadastrar!', 'Fechar', { duration: 3000 });
    });
  }

}
