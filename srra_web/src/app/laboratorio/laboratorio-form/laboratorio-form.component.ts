import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
import { LaboratorioService } from '../laboratorio.service';

@Component({
    selector: 'app-laboratorio-form',
    templateUrl: './laboratorio-form.component.html',
    styleUrls: ['./laboratorio-form.component.scss']
})
export class LaboratorioFormComponent implements OnInit {

    laboratorio: any = {};

    constructor(
        private navComponent: NavComponent,
        private laboratorioService: LaboratorioService,
        private snackbar: MatSnackBar,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.navComponent.setTitle('Cadastrar Laboratorio');
        
        this.activatedRoute.params.subscribe((params: Params) => {
            this.laboratorioService.buscar(params.id).subscribe(data => {
                this.laboratorio = data;
            });
        });
    }

    onSubmit() {
        if (this.laboratorio._id) {
            this.laboratorioService.alterar(this.laboratorio._id, this.laboratorio).then((data) => {
                this.laboratorio = data;
                this.snackbar.open('Salvo com Sucesso!', 'Fechar', { duration: 3000 });
            })
            .catch(() => {
                this.snackbar.open('Erro ao Salvar!', 'Fechar', { duration: 3000 });
            });
        }
        else {
            this.laboratorioService.inserir(this.laboratorio).then(() => {
                this.snackbar.open('Cadastrado com Sucesso!', 'Fechar', { duration: 3000 });
            })
            .catch(() => {
                this.snackbar.open('Erro ao Cadastrar!', 'Fechar', { duration: 3000 });
            });
        }
    }

}
