import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
    private snackbar: MdSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.recursoService.buscar(params.id).subscribe( data => {
        this.recurso = data;
      });
    });
  }

  cadastrar() {
    if(this.recurso._id) {
      this.recursoService.alterar(this.recurso._id, this.recurso).then( () => {
        this.snackbar.open('Alterado com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch( (err) => {
        this.snackbar.open('Erro ao Alterar!', 'Fechar', { duration: 3000 });
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
