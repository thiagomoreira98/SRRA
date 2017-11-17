import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
import { DocenteService } from '../docente.service';

@Component({
  selector: 'app-docente-form',
  templateUrl: './docente-form.component.html',
  styleUrls: ['./docente-form.component.scss']
})
export class DocenteFormComponent implements OnInit {

  docente: any = {};

  constructor(
    private navComponent: NavComponent,
    private docenteService: DocenteService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Cadastrar Docente');

    this.activatedRoute.params.subscribe((params: Params) => {
      this.docenteService.buscar(params.id).subscribe( data => {
        this.docente = data;
      });
    });
  }

  onSubmit() {
    if(this.docente._id) {
      this.docenteService.alterar(this.docente).then( (data) => {
        this.docente = data;
        this.snackbar.open('Salvo com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch( () => {
        this.snackbar.open('Erro ao Salvar!', 'Fechar', { duration: 3000 });
      });
    }
    else {
      this.docenteService.inserir(this.docente).then( () => {
        this.snackbar.open('Cadastrado com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch( () => {
        this.snackbar.open('Erro ao Cadastrar!', 'Fechar', { duration: 3000 });
      });
    }
  }

}
