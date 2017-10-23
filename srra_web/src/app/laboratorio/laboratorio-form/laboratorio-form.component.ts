import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.laboratorioService.buscar(params.id).subscribe( data => {
        this.laboratorio = data;
      });
    });
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
