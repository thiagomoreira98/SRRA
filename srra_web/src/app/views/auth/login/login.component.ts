import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Router } from "@angular/router";

import { UiSnackbar, UiColor } from 'ng-smn-ui';
import { LoginService } from './login.service';
import { UserService } from "../../../core/utils/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('tabsPages') tabsPages;

  login: any = {};
  loading: boolean;

  constructor(
    private service: LoginService,
    private router: Router,
    private element: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  buscarDadosUsuario(form) {
    if (form.invalid || this.loading) {
      form.controls.usuario.markAsTouched();
      form.controls.usuario.markAsDirty();
      this.focusElement('#pre-login-usuario');
      return;
    }

    this.loading = true;

    if (this.login.email.indexOf('@fatec.sp.gov.br') == -1) {
      this.loading = false;
      return this.showSnackBar('Você precisa ter um E-mail com dominio @fatec.sp.gov.br!');
    }

    this.service.buscarDadosUsuario(this.login.email).then((data: any) => {
      Object.assign(this.login, data.content);
      this.loading = false;
      this.tabsPages.pagesGoToPage(2);
    }).catch((res: any) => {
      this.loading = false;
      this.showSnackBar(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.');
    });
  }

  fazerLogin(form) {
    const elementPassword = this.element.nativeElement.querySelector('#login-senha');

    if (form.invalid || this.loading) {
      form.controls.senha.markAsTouched();
      form.controls.senha.markAsDirty();
      elementPassword.focus();
      return;
    }

    this.loading = true;

    this.service.fazerLogin(this.login).then((data: any) => {
      UserService.setToken(data.content.token);
      UserService.setMenu(data.content.opcoesMenu);
      UserService.setUser(data.content);
      this.loading = false;
      this.router.navigate(['/']);
    }).catch((res: any) => {
      this.loading = false;
      this.showSnackBar(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.');
    });
  }

  isBright(color: string) {
    return UiColor.isBright(color)
  }

  focusElement(selector, withDelay?) {
    setTimeout(() => {
      this.element.nativeElement.querySelector(selector).focus();
    }, withDelay ? 280 : 0);
  }

  backToLogin() {
    this.tabsPages.pagesGoToPage(1);
    this.focusElement('#pre-login-usuario');
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
