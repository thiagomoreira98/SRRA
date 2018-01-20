import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { LaboratorioService } from '../laboratorio.service';

import { NavComponent } from '../../nav/nav.component';

@Component({
  selector: 'app-laboratorio-form',
  templateUrl: './laboratorio-form.component.html',
  styleUrls: ['./laboratorio-form.component.scss']
})
export class LaboratorioFormComponent implements OnInit {

  laboratorio: any = {};

  constructor(
    private laboratorioService: LaboratorioService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private navComponent: NavComponent
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.laboratorioService.buscar(params.id).subscribe(data => {
          this.laboratorio = data;
        });
      }
    });

    if (this.laboratorio._id) {
      this.navComponent.setTitle('Alterar Laboratório');
    }
    else {
      this.navComponent.setTitle('Cadastrar Laboratorio');
    }
  }

  onSubmit() {
    if (this.laboratorio._id) {
      this.laboratorioService.alterar(this.laboratorio).then((res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
      }).catch((res: any) => {
        this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
      });
    }
    else {
      this.laboratorioService.inserir(this.laboratorio).then((res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
        this.laboratorio = {};
      }).catch((res: any) => {
        this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
      });
    }
  }

}
