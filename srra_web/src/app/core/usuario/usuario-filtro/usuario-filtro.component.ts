import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-filtro',
  templateUrl: './usuario-filtro.component.html',
  styleUrls: ['./usuario-filtro.component.scss']
})
export class UsuarioFiltroComponent implements OnInit {

  funcoes: any = [];
  filtro: any = {
    pagina: 1,
    quantidade: 10,
    funcao: "Todas"
  };

  constructor(
    private navComponent: NavComponent,
    private service: UsuarioService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Buscar Usuarios');
    this.selecionarGrupo();
  }

  selecionarGrupo() {
    this.service.selecionarGrupo().subscribe((data: any) => {
      this.funcoes = data.content;
    }, (res: any) => {
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
    });
  }

  filtrar() {
    this.router.navigate(['usuarios', this.filtro]);
  }
}
