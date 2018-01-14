import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
import { DocenteService } from '../docente.service';

@Component({
  selector: 'app-docente-filtro',
  templateUrl: './docente-filtro.component.html',
  styleUrls: ['./docente-filtro.component.scss']
})
export class DocenteFiltroComponent implements OnInit {

  funcoes: any = [];
  filtro: any = {
    pagina: 1,
    quantidade: 10,
    funcao: "Todas"
  };

  constructor(
    private navComponent: NavComponent,
    private service: DocenteService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Buscar Docentes');
    this.selecionarFuncao();
  }

  selecionarFuncao() {
    this.service.selecionarFuncao().subscribe((data: any) => {
      this.funcoes = data.content;
    }, (res: any) => {
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
    });
  }

  filtrar() {
    this.router.navigate(['docentes', this.filtro]);
  }
}
