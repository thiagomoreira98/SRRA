import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { DocenteService } from '../docente.service';

@Component({
  selector: 'app-docente-form',
  templateUrl: './docente-form.component.html',
  styleUrls: ['./docente-form.component.scss']
})
export class DocenteFormComponent implements OnInit {

  docente: any = {};

  constructor(private docenteService: DocenteService, private snackbar: MdSnackBar) { }

  ngOnInit() {
  }

  cadastrar() {
    this.docenteService.postDocente(this.docente).then( () => {
      this.snackbar.open('Cadastrado com Sucesso!', 'Fechar', { duration: 3000});
    })
      .catch( () => {
        this.snackbar.open('Erro ao Cadastrar!', 'Fechar', { duration: 3000});
      });
  }

}
