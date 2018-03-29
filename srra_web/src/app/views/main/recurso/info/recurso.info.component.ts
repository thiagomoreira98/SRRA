import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiSnackbar, UiToolbarService, UiElement } from 'ng-smn-ui';
import { RecursoService } from '../recurso.service';

@Component({
  selector: 'app-recurso.info',
  templateUrl: './recurso.info.component.html',
  styleUrls: ['./recurso.info.component.scss']
})
export class RecursoInfoComponent implements OnInit, AfterViewInit, OnDestroy {

  item: String;
  tipos: any = [];
  status: any = [];
  info: any = {};
  loading: boolean;
  saving: boolean;
  deleting: boolean;
  addingNew: boolean;
  idStatusDisponivel: string;

  constructor(
    private _toolbar: UiToolbarService,
    private _service: RecursoService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _element: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.selecionarTipos();
    this.selecionarStatus();
  }

  ngAfterViewInit() {
    this._toolbar.activateExtendedToolbar(480);

    if (this._route.snapshot.params['id']) {
      setTimeout(() => {
        this.addingNew = false;
      }, 300);
      this.getInfo();
      this._toolbar.set('Alterar Recurso');
    } else {
      this._toolbar.set('Novo Recurso');
      setTimeout(() => {
        this.addingNew = true;
        this.loading = false;
      }, 300);
    }
  }

  ngOnDestroy() {
    this._toolbar.deactivateExtendedToolbar();
  }

  getInfo() {
    this.loading = true;
    this.changeDetectorRef.detectChanges();

    this._service.buscar(this._route.snapshot.params['id']).subscribe(data => {
      this.info = data.content;
      this.loading = false;
    }, (res: any) => {
      this.loading = false;
      this.showSnackBar('Ocorreu um erro no servidor.');
    });
  }

  selecionarTipos() {
    this._service.selecionarTipos().subscribe((data: any) => {
      this.tipos = data.content;
    }, (res: any) => {
      this.showSnackBar('Ocorreu um erro no servidor.');
    });
  }

  selecionarStatus() {
    this._service.selecionarStatus().subscribe((data: any) => {
      this.status = data.content;
      this.selecionarIdStatusDisponivel()
    }, (res: any) => {
      this.showSnackBar('Ocorreu um erro no servidor.');
    });
  }

  selecionarIdStatusDisponivel() {
    for (let i = 0; i < this.status.length; i++) {
      if (this.status[i].nome == 'Disponivel') {
        this.idStatusDisponivel = this.status[i].id;
      }
    }
  }

  verifyStatus() {
    if (this.info.idStatus == this.idStatusDisponivel) {
      this.info.motivo = null;
      this.info.dataMotivo = null;
    }
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

      if (this.info.id) {
        this._service.alterar(this.info).then((res: any) => {
          this.showSnackBar(res.message);
          this.saving = false;
        }).catch((res: any) => {
          this.saving = false;
          this.showSnackBar(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.');
        });
      }
      else {
        this._service.inserir(this.info).then((res: any) => {
          this.showSnackBar(res.message);
          this.info = {};
          this.saving = false;
        }).catch((res: any) => {
          this.saving = false;
          this.showSnackBar(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.');
        });
      }
    }
  }

  confirmDelete(): any {
    if (!this.deleting) {
      this.deleting = true;

      this._service.deletar(this.info.id).then((res: any) => {
        this.deleting = false;
        this._router.navigate(['/recurso']);
        this.showSnackBar(res.message);
      }).catch((res: any) => {
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
