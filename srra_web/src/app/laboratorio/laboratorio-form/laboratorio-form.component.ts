import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import {LaboratorioService} from '../laboratorio.service';

@Component({
  selector: 'app-laboratorio-form',
  templateUrl: './laboratorio-form.component.html',
  styleUrls: ['./laboratorio-form.component.scss']
})
export class LaboratorioFormComponent implements OnInit {

  laboratorio: any = {};

  constructor(
    private laboratorioService: LaboratorioService,
    private snackbar: MdSnackBar
  ) { }

  ngOnInit() {
  }

  cadastar() {
    this.laboratorioService.inserir(this.laboratorio)
      .then( () => {
        this.snackbar.open('Cadastrado com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch( () => {
        this.snackbar.open('Erro ao Cadastrar!', 'Fechar', { duration: 3000 });
      });
  }

}
