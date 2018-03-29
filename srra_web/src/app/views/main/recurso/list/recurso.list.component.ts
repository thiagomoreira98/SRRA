import { Component, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UiSnackbar, UiToolbarService, UiElement } from 'ng-smn-ui';
import { Subject } from 'rxjs/Subject';
import { RecursoService } from '../recurso.service';

@Component({
  selector: 'app-recurso.list',
  templateUrl: './recurso.list.component.html',
  styleUrls: ['./recurso.list.component.scss']
})

export class RecursoListComponent implements OnInit, AfterViewInit, OnDestroy {

  recursos: any;
  recursoDialog: any;
  totalPaginas: number;
  totalRegistros: number;
  loading: boolean;
  saving: boolean;
  deleting: boolean;
  filtro: any;
  tipos: any;
  status: any;
  statusDialog: any;

  private searchTerms = new Subject<string>();
  searchOpen: boolean;
  searching: boolean;
  itemParaDeletar: any;

  constructor(
    private _toolbar: UiToolbarService,
    private _service: RecursoService,
    private _route: ActivatedRoute,
    private _change: ChangeDetectorRef,
    private _element: ElementRef
  ) {
    this.searching = false;
    this.recursos = [];
    this.recursoDialog = {};
    this.itemParaDeletar = {};
    this.filtro = {
      pagina: 1,
      quantidade: 10
    };
  }

  ngOnInit() {
    this._toolbar.set('Recursos');

    this.searchOpen = false;
    this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(() => {
        this.searching = true;
        this.selecionar();
      });

    this.selecionarStatus();
    this.selecionarTipos();
  }

  ngAfterViewInit() {
    this._toolbar.activateExtendedToolbar(480);
    this.selecionar();
  }

  ngOnDestroy() {
    this._toolbar.deactivateExtendedToolbar();
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  selecionar() {
    if (!this.loading) {
      this.loading = true;
      this._change.detectChanges();

      this._service.selecionar(this.filtro).subscribe((data: any) => {
        this.recursos = data.content.registros;
        this.totalRegistros = data.content.totalRegistros;
        this.totalPaginas = this.calcularTotalPaginas((this.totalRegistros / this.filtro.quantidade).toString());
        this.loading = false;
      }, (res: any) => {
        this.loading = false;
        this.showSnackBar('Ocorreu um erro no servidor.');
      });
    }
  }

  selecionarTipos() {
    this._service.selecionarTipos().subscribe((data: any) => {
      this.tipos = data.content;
      this.tipos.push({ id: '', nome: 'Todos' });
    }, (res: any) => {
      this.showSnackBar('Ocorreu um erro no servidor.');
    });
  }

  selecionarStatus() {
    this._service.selecionarStatus().subscribe((data: any) => {
      this.status = data.content;
      this.status.push({ id: '', nome: 'Todos' });
      // this.statusDialog = this.status;
      // console.log(this.statusDialog);
    }, (res: any) => {
      this.showSnackBar('Ocorreu um erro no servidor.');
    });
  }

  proximaPagina() {
    this.filtro.pagina += 1;
    this.selecionar();
  }

  voltarPagina() {
    this.filtro.pagina -= 1;
    this.selecionar();
  }

  calcularTotalPaginas(paginas): any {
    if (paginas.length > 1)
      return parseInt(paginas) + 1;

    return parseInt(paginas);
  }

  prepararExcluir(event, recurso) {
    event.stopPropagation();
    this.itemParaDeletar = recurso;
  }

  confirmDelete(): any {
    if (!this.deleting) {
      this.deleting = true;

      this._service.deletar(this.itemParaDeletar.id).then((res: any) => {
        this.showSnackBar(res.message);
        this.deleting = false;
        this.selecionar();
      }).catch((res: any) => {
        this.deleting = false;
        this.showSnackBar(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.');
      });
    }
  }

  showDialog(event, recurso, dialog) {
    event.stopPropagation();
    this.recursoDialog = recurso;
    setTimeout(function () {
      dialog.show();
      let div = document.querySelector('div .overlay');
      div.setAttribute('style', 'pointer-events: none');
    }, 400);
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

      this._service.alterar(this.recursoDialog).then((res: any) => {
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
    });
  }
}
