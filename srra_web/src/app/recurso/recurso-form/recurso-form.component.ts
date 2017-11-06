import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { RecursoService } from '../recurso.service';
import { NavComponent } from '../../nav/nav.component';

@Component({
  selector: 'app-recurso-form',
  templateUrl: './recurso-form.component.html',
  styleUrls: ['./recurso-form.component.scss']
})
export class RecursoFormComponent implements OnInit {

  recurso: any = {};
  item: String;

  constructor(
    private recursoService: RecursoService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private navComponent: NavComponent
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.recursoService.buscar(params.id).subscribe( data => {
        this.recurso = data;
      });
    });

    if(!this.recurso._id) {
      this.recurso.itens = [];
      this.navComponent.setTitle('Cadastrar Recurso');
    }
    else {
      this.navComponent.setTitle('Alterar Recurso');
    }
  }

  adicionarItem(item) {
    this.recurso.itens.push(item);
    this.item = '';
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
