import { Component, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { UiSnackbar, UiToolbarService } from 'ng-smn-ui';
import { GrupoService } from '../grupo.service';
import { UserService } from '../../../../core/utils/user/user.service';

@Component({
    selector: 'app-grupo-list',
    templateUrl: './grupo.list.component.html',
    styleUrls: ['./grupo.list.component.scss']
})
export class GrupoListComponent implements OnInit, AfterViewInit, OnDestroy {

    grupos: any;
    totalPaginas: number;
    totalRegistros: number;
    loading: boolean;
    deleting: boolean;
    filtro: any;

    private searchTerms = new Subject<string>();
    searchOpen: boolean;
    searching: boolean;
    itemParaDeletar: any;

    constructor(
        private _toolbar: UiToolbarService,
        private _service: GrupoService,
        private _route: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        this.searching = false;
        this.grupos = [];
        this.itemParaDeletar = {};
        this.filtro = {
            pagina: 1,
            quantidade: 10,
            nome: ''
        };
    }

    search(term: string) {
        this.searchTerms.next(term);
    }

    ngOnInit() {
        this.searchOpen = false;
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(() => {
                this.searching = true;
                this.getGrupos();
            });
    }

    ngAfterViewInit() {
        this._toolbar.set('Grupos');
        this._toolbar.activateExtendedToolbar(480);
        this.getGrupos();
    }

    ngOnDestroy() {
        this._toolbar.deactivateExtendedToolbar();
    }

    getGrupos() {
        this.loading = true;
        this.changeDetectorRef.detectChanges();

        this._service.selecionar(this.filtro.nome).subscribe((data: any) => {
            this.grupos = data.content.registros;
            this.totalRegistros = data.content.totalRegistros;
            this.totalPaginas = this.calcularTotalPaginas((this.totalRegistros / this.filtro.quantidade).toString());
            this.loading = false;
        }, (res: any) => {
            this.loading = false;
            this.showSnackBar('Ocorreu um erro no servidor.');
        });
    }

    calcularTotalPaginas(paginas): any {
        if (paginas.length > 1)
            return parseInt(paginas) + 1;

        return parseInt(paginas);
    }

    prepararExcluir(event, grupo, dialog) {
        event.stopPropagation();
        this.itemParaDeletar = grupo;
        console.log(dialog);
        dialog.show();
    }

    confirmDelete(dialog): any {
        if (!this.deleting) {
            this.deleting = true;

            let user = UserService.getUser();
            if (user.idGrupo == this.itemParaDeletar.id) {
                this.deleting = false;
                return this.showSnackBar('Você não pode remover o grupo, pois você pertence a ele.');
            }

            this._service.deletar(this.itemParaDeletar.id).then((res: any) => {
                this.deleting = false;
                this.showSnackBar(res.message);
                this.getGrupos();
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
        });
    }

}
