import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiSnackbar, UiToolbarService, UiElement } from 'ng-smn-ui';
import { OcorrenciaService } from '../ocorrencia.service';

@Component({
  selector: 'app-ocorrencia.info',
  templateUrl: './ocorrencia.info.component.html',
  styleUrls: ['./ocorrencia.info.component.scss']
})
export class OcorrenciaInfoComponent implements OnInit, AfterViewInit, OnDestroy {

  item: String;
  status: any = [];
  info: any = {};
  loading: boolean;
  saving: boolean;

  constructor(
    private _toolbar: UiToolbarService,
    private _service: OcorrenciaService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _element: ElementRef,
    private _change: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.selecionarStatus();
  }

  ngAfterViewInit() {
    this._toolbar.activateExtendedToolbar(480);

    this._toolbar.set('Nova Ocorrencia');
    setTimeout(() => {
      this.loading = false;
    }, 300);
  }

  ngOnDestroy() {
    this._toolbar.deactivateExtendedToolbar();
  }

  getInfo() {
    this.loading = true;
    this._change.detectChanges();
  }

  selecionarStatus() {
    this._service.selecionarStatus().subscribe((data: any) => {
      this.status = data.content;
    }, (res: any) => {
      this.showSnackBar('Ocorreu um erro no servidor.');
    });
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
