import { Component, OnInit } from '@angular/core';

import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: any = {};
  cor: '';

  constructor(
    private service: LoginService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  buscarDadosUsuario(tabsPages) {

    if (this.login.email.indexOf('@fatec.sp.gov.br') == -1)
      return this.snackbar.open('Você precisa ter um E-mail com dominio @fatec.sp.gov.br!', 'Fechar', { duration: 3000 });

    this.service.buscarDadosUsuario(this.login.email).subscribe((data: any) => {
      Object.assign(this.login, data.content);
      console.log('login: ', this.login);
      tabsPages.pagesGoToPage(2);
    }, (res: any) => {
      console.log(res);
      this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
    });
  }

  fazerLogin() {
    this.service.fazerLogin(this.login).subscribe((data: any) => {
      console.log(data.content);
    }, (res: any) => {
      console.log(res);
      this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
    });
  }

}
