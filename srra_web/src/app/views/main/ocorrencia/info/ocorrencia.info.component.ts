import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiSnackbar, UiToolbarService, UiElement } from 'ng-smn-ui';
import { OcorrenciaService } from '../ocorrencia.service';
import { RecursoService } from '../../recurso/recurso.service';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-ocorrencia.info',
  templateUrl: './ocorrencia.info.component.html',
  styleUrls: ['./ocorrencia.info.component.scss']
})
export class OcorrenciaInfoComponent implements OnInit, AfterViewInit, OnDestroy {

  status: any = [];
  info: any = {};
  saving: boolean;
  recursos: any = [];
  usuarios: any = [];

  constructor(
    private _toolbar: UiToolbarService,
    private _service: OcorrenciaService,
    private _usuarioService: UsuarioService,
    private _recursoService: RecursoService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _element: ElementRef
  ) { }

  ngOnInit() {
    this.selecionarRecurso();
    this.selecionarUsuario();
  }

  ngAfterViewInit() {
    this._toolbar.activateExtendedToolbar(480);
    this._toolbar.set('Nova Ocorrencia');
  }

  ngOnDestroy() {
    this._toolbar.deactivateExtendedToolbar();
  }

  selecionarRecurso() {
    this._recursoService.selecionarRecursoDropdown().subscribe((data: any) => {
      this.recursos = data.content;
    }, (res: any) => {
      this.showSnackBar('Ocorreu um erro no servidor.');
    });
  }

  selecionarUsuario() {
    this._usuarioService.selecionarUsuarioDropdown().subscribe((data: any) => {
      this.usuarios = data.content;
    }, (res: any) => {
      this.showSnackBar('Ocorreu um erro no servidor.');
    });
  }

  checkIndisponivel() {
    if(!this.info.indisponivel) 
      this.info.motivo = null;
  }

  onSubmit(form) {
    if (!this.saving) {

      for (const control in form.controls) {
        if (form.controls.hasOwnProperty(control)) {
          form.controls[control].markAsTouched();
          form.controls[control].markAsDirty();
        }
      }

      if (!form.valid) {
        UiElement.focus(this._element.nativeElement.querySelector('form .ng-invalid'));
        return false;
      }

      this.saving = true;

      this._service.inserir(this.info).then((res: any) => {
        this.showSnackBar(res.message);
        this.saving = false;
      }).catch((res: any) => {
        this.saving = false;
        this.showSnackBar(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.');
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
