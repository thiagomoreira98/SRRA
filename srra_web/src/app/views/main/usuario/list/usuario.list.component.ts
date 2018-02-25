import { Component, AfterViewInit, ElementRef, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { UiSnackbar, UiToolbarService } from 'ng-smn-ui';
import { UsuarioService } from '../usuario.service';
import { GrupoService } from '../../grupo/grupo.service';

@Component({
    selector: 'app-usuario-list',
    templateUrl: './usuario.list.component.html',
    styleUrls: ['./usuario.list.component.scss']
})
export class UsuarioListComponent implements OnInit, AfterViewInit, OnDestroy {

    usuarios: any;
    grupos: any;
    totalPaginas: number;
    totalRegistros: number;
    loading: boolean;
    filtro: any;

    private searchTerms = new Subject<string>();
    searchOpen: boolean;
    searching: boolean;
    itemParaDeletar: any;

    constructor(
        private _toolbar: UiToolbarService,
        private _service: UsuarioService,
        private _grupoService: GrupoService,
        private _route: ActivatedRoute
    ) {
        this.searching = false;
        this.grupos = [];
        this.usuarios = [];
        this.itemParaDeletar = {};
        this.filtro = {
            pagina: 1,
            quantidade: 10
        };
    }

    search(term: string) {
        this.searchTerms.next(term);
    }

    ngOnInit() {
        this.getGrupos();
        this.searchOpen = false;
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(() => {
                this.searching = true;
                this.getUsuarios();
            });
    }

    ngAfterViewInit() {
        this._toolbar.set('Usuarios');
        this._toolbar.activateExtendedToolbar(480);
        this.getUsuarios();
    }

    ngOnDestroy() {
        this._toolbar.deactivateExtendedToolbar();
    }

    getGrupos() {
        this._grupoService.selecionarDropdown().subscribe((data: any) => {
            this.grupos = data.content;
            this.grupos.push({ id: '', nome: 'Todos' });
        }, (res: any) => {
            this.showSnackBar('Ocorreu um erro no servidor.');
        });
    }

    getUsuarios() {
        this._service.selecionar(this.filtro).subscribe((data: any) => {
            this.loading = true;
            this.usuarios = data.content.registros;
            this.totalRegistros = data.content.totalRegistros;
            this.totalPaginas = this.calcularTotalPaginas((this.totalRegistros / this.filtro.quantidade).toString());
        }, (res: any) => {
            this.showSnackBar('Ocorreu um erro no servidor.');
        }, () => {
            this.loading = false;
            this.searching = false;
        });
    }

    calcularTotalPaginas(paginas): any {
        if (paginas.length > 1)
            return parseInt(paginas) + 1;

        return parseInt(paginas);
    }

    prepararExcluir(event, usuario) {
        event.stopPropagation();
        this.itemParaDeletar = usuario;
    }

    deletar(): any {
        this._service.deletar(this.itemParaDeletar.id).then((res: any) => {
            this.showSnackBar(res.message);
            this.getUsuarios();
        }).catch((res: any) => {
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
