import { Component, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UiSnackbar, UiToolbarService, UiElement } from 'ng-smn-ui';
import { Subject } from 'rxjs/Subject';
import { OcorrenciaService } from '../ocorrencia.service';
import { RecursoService } from '../../recurso/recurso.service';
import { UsuarioService } from '../../usuario/usuario.service';

@Component({
  selector: 'app-ocorrencia.list',
  templateUrl: './ocorrencia.list.component.html',
  styleUrls: ['./ocorrencia.list.component.scss']
})

export class OcorrenciaListComponent implements OnInit, AfterViewInit, OnDestroy {

  ocorrencias: any;
  totalPaginas: number;
  totalRegistros: number;
  loading: boolean;
  filtro: any;
  status: any;
  recursos: any;
  usuarios: any;

  private searchTerms = new Subject<string>();
  searchOpen: boolean;
  searching: boolean;
  itemParaDeletar: any;

  constructor(
    private _toolbar: UiToolbarService,
    private _service: OcorrenciaService,
    private _usuarioService: UsuarioService,
    private _recursoService: RecursoService,
    private _route: ActivatedRoute,
    private _change: ChangeDetectorRef,
    private _element: ElementRef
  ) {
    this.searching = false;
    this.ocorrencias = [];
    this.filtro = {
      pagina: 1,
      quantidade: 10
    };
  }

  ngOnInit() {
    this._toolbar.set('Ocorrências');

    this.searchOpen = false;
    this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(() => {
        this.searching = true;
        // this.selecionar();
      });

    this.selecionarStatus();
    this.selecionarRecurso();
    this.selecionarUsuario();
  }

  ngAfterViewInit() {
    this._toolbar.activateExtendedToolbar(480);
    // this.selecionar();
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
        this.ocorrencias = data.content.registros;
        this.totalRegistros = data.content.totalRegistros;
        this.totalPaginas = this.calcularTotalPaginas((this.totalRegistros / this.filtro.quantidade).toString());
        this.loading = false;
      }, (res: any) => {
        this.loading = false;
        this.showSnackBar('Ocorreu um erro no servidor.');
      });
    }
  }

  selecionarRecurso() {
    this._recursoService.selecionarRecursoDropdown().subscribe((data: any) => {
      this.recursos = data.content;
      this.recursos.push({ id: '', nome: 'Todos' });
    }, (res: any) => {
      this.showSnackBar('Ocorreu um erro no servidor.');
    });
  }

  selecionarUsuario() {
    this._usuarioService.selecionarUsuarioDropdown().subscribe((data: any) => {
      this.usuarios = data.content;
      this.usuarios.push({ id: '', nome: 'Todos' });
    }, (res: any) => {
      this.showSnackBar('Ocorreu um erro no servidor.');
    });
  }

  selecionarStatus() {
    this._service.selecionarStatus().subscribe((data: any) => {
      this.status = data.content;
      this.status.push({ id: '', nome: 'Todos' });
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
