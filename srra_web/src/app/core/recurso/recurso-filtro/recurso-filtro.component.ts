import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
import { RecursoService } from '../recurso.service';

@Component({
  selector: 'app-recurso-filtro',
  templateUrl: './recurso-filtro.component.html',
  styleUrls: ['./recurso-filtro.component.scss']
})
export class RecursoFiltroComponent implements OnInit {

  tipoRecurso: any = [];
  statusRecurso: any = [];
  filtro: any = {
    pagina: 1,
    quantidade: 10,
    tipo: 'Todos',
    status: 'Todos'
  };

  constructor(
    private navComponent: NavComponent,
    private service: RecursoService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.selecionarTipoRecurso();
    this.selecionarStatusRecurso();
    this.navComponent.setTitle('Buscar Recursos');
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

  filtrar() {
    this.router.navigate(['recursos', this.filtro]);
  }

}
