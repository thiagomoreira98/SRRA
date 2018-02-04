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
  tipoRecurso: any = [];
  statusRecurso: any = [];
  
  constructor(
    private navComponent: NavComponent,
    private service: RecursoService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.buscar();
    this.selecionarTipoRecurso();
    this.selecionarStatusRecurso();

    if (this.recurso.id) {
      this.navComponent.setTitle('Alterar Recurso');
    }
    else {
      this.recurso.itens = [];
      this.navComponent.setTitle('Cadastrar Recurso');
    }
  }

  buscar() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.service.buscar(params.id).subscribe(data => {
          this.recurso = data.content;
        }, (res: any) => {
          this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
        });
      }
    });
  }

  selecionarTipoRecurso() {
    this.service.selecionarTipoRecurso().subscribe((data: any) => {
      this.tipoRecurso = data.content;
    }, (res: any) => {
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
    });
  }

  selecionarStatusRecurso() {
    this.service.selecionarStatusRecurso().subscribe((data: any) => {
      this.statusRecurso = data.content;
    }, (res: any) => {
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
    });
  }

  adicionarItem() {
    this.recurso.itens.push(this.item);
    this.item = '';
  }

  onSubmit() {
    if (this.recurso.id) {
      this.service.alterar(this.recurso).then((res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
      }).catch((res: any) => {
        this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
      });
    }
    else {
      this.service.inserir(this.recurso).then((res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
        this.recurso = {};
      }).catch((res: any) => {
        this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
      });
    }
  }

}
