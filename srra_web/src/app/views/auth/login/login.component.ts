import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UiSnackbar } from 'ng-smn-ui';
import { LoginService } from './login.service';
import { UserService } from "../../../core/utils/user/user.service";

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
    private router: Router
  ) { }

  ngOnInit() {
  }

  buscarDadosUsuario(tabsPages) {

    if (this.login.email.indexOf('@fatec.sp.gov.br') == -1)
      return this.showSnackBar('Você precisa ter um E-mail com dominio @fatec.sp.gov.br!');

    this.service.buscarDadosUsuario(this.login.email).then((data: any) => {
      Object.assign(this.login, data.content);
      tabsPages.pagesGoToPage(2);
    }).catch((res: any) => {
      this.showSnackBar(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.');
    });
  }

  fazerLogin() {
    this.service.fazerLogin(this.login).then((data: any) => {
      UserService.setToken(data.content.token);
      UserService.setMenu(data.content.opcoesMenu);
      UserService.setUser(data.content.usuario);
      this.router.navigate(['/']);
    }).catch((res: any) => {
      this.showSnackBar(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.');
    });
  }

  showSnackBar(message) {
    UiSnackbar.hide();
    UiSnackbar.show({
      text: message,
      action: (close) => {
        close();
      },
      actionText: 'Fechar',
      duration: 3000
    });
  }

}
