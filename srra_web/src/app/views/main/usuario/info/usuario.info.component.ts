import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiSnackbar, UiToolbarService } from 'ng-smn-ui';
import { UsuarioService } from '../usuario.service';
import { GrupoService } from '../../grupo/grupo.service';

@Component({
  selector: 'app-usuario-info',
  templateUrl: './usuario.info.component.html',
  styleUrls: ['./usuario.info.component.scss']
})
export class UsuarioInfoComponent implements AfterViewInit, OnDestroy {

  info: any = {};
  grupos: any = [];
  loading: boolean;
  saving: boolean;
  deleting: boolean;
  addingNew: boolean;

  constructor(
    private _toolbar: UiToolbarService,
    private _service: UsuarioService,
    private _grupoService: GrupoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngAfterViewInit() {
    this._toolbar.activateExtendedToolbar(480);
    this.getGrupos();

    if (this._route.snapshot.params['id']) {
      setTimeout(() => {
        this.addingNew = false;
      }, 300);
      this.getInfo();
      this._toolbar.set('Alterar Usuario');
    } else {
      this._toolbar.set('Novo Usuario');
      setTimeout(() => {
        this.addingNew = true;
        this.loading = false;
      }, 300)
    }
  }

  ngOnDestroy() {
    this._toolbar.deactivateExtendedToolbar();
  }

  getInfo() {
    this._service.buscar(this._route.snapshot.params['id']).subscribe((data: any) => {
      this.loading = true;
      this.info = data.content;
    }, (res: any) => {
      this.showSnackBar('Ocorreu um erro no servidor.');
    }, () => {
      this.loading = false;
    });
  }

  getGrupos() {
    this._grupoService.selecionarDropdown().subscribe((data: any) => {
      this.grupos = data.content;
    }, (res: any) => {
      this.showSnackBar('Ocorreu um erro no servidor.');
    });
  }

  onSubmit(form) {
    if (this.info.email.indexOf('@fatec.sp.gov.br') == -1)
      return this.showSnackBar('Você precisa ter um E-mail com dominio @fatec.sp.gov.br!');

    this.saving = true;
    if (this.info.id) {
      this._service.alterar(this.info).then((res: any) => {
        this.saving = false;
        this.showSnackBar(res.message);
      }).catch((res: any) => {
        this.saving = false;
        this.showSnackBar(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.');
      });
    }
    else {
      this._service.inserir(this.info).then((res: any) => {
        this.saving = false;
        this.showSnackBar(res.message);
        this.info = {};
      }).catch((res: any) => {
        this.saving = false;
        this.showSnackBar(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.');
      });
    }
  }

  confirmDelete(): any {
    this.deleting = true;

    this._service.deletar(this.info.id).then((res: any) => {
      this.deleting = false;
      this._router.navigate(['/usuario'])
      this.showSnackBar(res.message);
    }).catch((res: any) => {
      this.deleting = false;
      this.showSnackBar('Ocorreu um erro no servidor.');
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
    })
  }

}
