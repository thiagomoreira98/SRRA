import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  usuario: any = {};
  grupos: any = [];
  showPassword: Boolean = false;

  constructor(
    private navComponent: NavComponent,
    private service: UsuarioService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Cadastrar usuario');
    this.grupoDropdown();
    this.buscar();
  }

  buscar() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.service.buscar(params.id).subscribe((data: any) => {
          this.usuario = data.content;
        }, (res: any) => {
          this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
        });
      }
    });
  }

  grupoDropdown() {
    this.service.selecionarGrupo().subscribe((data: any) => {
      this.grupos = data.content;
    }, (res: any) => {
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
    });
  }

  onSubmit() {
    if (this.usuario.email.indexOf('@fatec.sp.gov.br') == -1)
      return this.snackbar.open('Você precisa ter um E-mail com dominio @fatec.sp.gov.br!', 'Fechar', { duration: 3000 });

    if (this.usuario.id) {
      this.service.alterar(this.usuario).then((res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
      }).catch((res: any) => {
        this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
      });
    }
    else {
      this.service.inserir(this.usuario).then((res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
        this.usuario = {};
      }).catch((res: any) => {
        this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
      });
    }
  }

}
