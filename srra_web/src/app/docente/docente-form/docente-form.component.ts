import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { DocenteService } from '../docente.service';

@Component({
  selector: 'app-docente-form',
  templateUrl: './docente-form.component.html',
  styleUrls: ['./docente-form.component.scss']
})
export class DocenteFormComponent implements OnInit {

  docente: any = {};

  constructor(
    private docenteService: DocenteService,
    private snackbar: MdSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.docenteService.buscar(params.id).subscribe( data => {
        this.docente = data;
      });
    });
  }

  cadastrar() {
    this.docenteService.inserir(this.docente).then( () => {
      this.snackbar.open('Cadastrado com Sucesso!', 'Fechar', { duration: 3000});
    })
      .catch( () => {
        this.snackbar.open('Erro ao Cadastrar!', 'Fechar', { duration: 3000});
      });
  }

}
