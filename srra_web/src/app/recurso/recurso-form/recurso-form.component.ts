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
  item: String;

  constructor(
    private navComponent: NavComponent,
    private recursoService: RecursoService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Cadastrar Recurso');

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.recursoService.buscar(params.id).subscribe(data => {
          this.recurso = data;
        });
      }
    });

    if (this.recurso._id) {
      this.navComponent.setTitle('Alterar Recurso');
    }
    else {
      this.recurso.itens = [];
      this.navComponent.setTitle('Cadastrar Recurso');
    }
  }

  adicionarItem() {
    this.recurso.itens.push(this.item);
    this.item = '';
  }

  onSubmit() {
    if (this.recurso._id) {
      this.recursoService.alterar(this.recurso).then((res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
      }).catch((res: any) => {
        this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
      });
    }
    else {
      this.recursoService.inserir(this.recurso).then((res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
        this.recurso = {};
      }).catch((res: any) => {
        this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
      });
    }
  }

}
