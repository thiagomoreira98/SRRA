import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiSnackbar, UiToolbarService, UiElement } from 'ng-smn-ui';
import { GrupoService } from '../grupo.service';
import { UserService } from '../../../../core/utils/user/user.service';

@Component({
  selector: 'app-grupo-info',
  templateUrl: './grupo.info.component.html',
  styleUrls: ['./grupo.info.component.scss']
})
export class GrupoInfoComponent implements AfterViewInit, OnDestroy {

  info: any = {};
  funcionalidades: any = [];
  loading: boolean;
  saving: boolean;
  deleting: boolean;
  addingNew: boolean;
  menuList: any;
  itemModel: any;

  constructor(
    private _toolbar: UiToolbarService,
    private _service: GrupoService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _element: ElementRef
  ) { }

  ngOnInit() {
    this.getFuncionalidades();
  }

  ngAfterViewInit() {
    this._toolbar.activateExtendedToolbar(480);

    if (this._route.snapshot.params['id']) {
      setTimeout(() => {
        this.addingNew = false;
      }, 500);
      this.getInfo();
      this._toolbar.set('Alterar Grupo');
    } else {
      this._toolbar.set('Novo Grupo');
      this.info.funcionalidades = [];
      setTimeout(() => {
        this.addingNew = true;
        this.loading = false;
      }, 500);
    }
  }

  ngOnDestroy() {
    this._toolbar.deactivateExtendedToolbar();
  }

  getInfo() {
    this._service.buscar(this._route.snapshot.params['id']).subscribe((data: any) => {
      this.loading = true;
      this.info = data.content;
      setTimeout(() => {
        this.checkFuncionalidades();
      }, 200)
    }, (res: any) => {
      this.showSnackBar('Ocorreu um erro no servidor.');
    }, () => {
      this.loading = false;
    });
  }

  getFuncionalidades() {
    this._service.selecionarFuncionalidades().subscribe((data: any) => {
      this.funcionalidades = data.content;
    }, (res: any) => {
      this.showSnackBar('Ocorreu um erro no servidor.');
    });
  }

  checkFuncionalidades() {
    if (!this.info.funcionalidades) {
      return this.info.funcionalidades = [];
    }

    for (let i = 0; i < this.funcionalidades.length; i++) {
      for (let j = 0; j < this.info.funcionalidades.length; j++) {
        if (this.funcionalidades[i].id == this.info.funcionalidades[j].id) {
          this.funcionalidades[i].active = true;
        }
      }
    }
  }

  onSubmit(form) {
    if (!this.saving) {

      this.saving = true;

      for (const control in form.controls) {
        if (form.controls.hasOwnProperty(control)) {
          form.controls[control].markAsTouched();
          form.controls[control].markAsDirty();
        }
      }

      if (!form.valid) {
        UiElement.focus(this._element.nativeElement.querySelector('form .ng-invalid'));
        this.saving = false;
        return false;
      }

      this.info.funcionalidades = this.funcionalidades;

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
          this.info = {
            funcionalidades: []
          };
        }).catch((res: any) => {
          this.saving = false;
          this.showSnackBar(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.');
        });
      }
    }
  }

  confirmDelete(dialog): any {
    if (!this.deleting) {
        this.deleting = true;

        let user = UserService.getUser();
        if(user.idGrupo == this.info.id) {
          this.deleting = false;
          return this.showSnackBar('Você não pode remover o grupo, pois você pertence a ele.');
        }
        
        this._service.deletar(this.info.id).then((res: any) => {
            this.deleting = false;
            this.showSnackBar(res.message);
            dialog.close();
        }).catch((res: any) => {
            dialog.close();
            this.deleting = false;
            this.showSnackBar('Ocorreu um erro no servidor.');
        });
    }
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
