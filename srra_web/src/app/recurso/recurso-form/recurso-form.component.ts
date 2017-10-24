import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
import { RecursoService } from '../recurso.service';

@Component({
  selector: 'app-recurso-form',
  templateUrl: './recurso-form.component.html',
  styleUrls: ['./recurso-form.component.scss']
})
export class RecursoFormComponent implements OnInit {

  recurso: any = {};

  constructor(
    private navComponent: NavComponent,
    private recursoService: RecursoService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Cadastrar Recurso');

    this.activatedRoute.params.subscribe((params: Params) => {
      this.recursoService.buscar(params.id).subscribe( data => {
        this.recurso = data;
      });
    });
  }

  onSubmit() {
    if(this.recurso._id) {
      this.recursoService.alterar(this.recurso._id, this.recurso).then( (data) => {
        this.recurso = data;
        this.snackbar.open('Salvo com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch( (err) => {
        this.snackbar.open('Erro ao Salvar!', 'Fechar', { duration: 3000 });
      });
    }
    else{
      this.recursoService.inserir(this.recurso)
      .then( () => {
        this.snackbar.open('Cadastrado com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch( (err) => {
        this.snackbar.open('Erro ao Cadastrar!', 'Fechar', { duration: 3000 });
      });
    }
    
  }

}
