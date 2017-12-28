import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
import { DocenteService } from '../docente.service';

@Component({
  selector: 'app-docente-form',
  templateUrl: './docente-form.component.html',
  styleUrls: ['./docente-form.component.scss']
})
export class DocenteFormComponent implements OnInit {

  docente: any = {};

  constructor(
    private navComponent: NavComponent,
    private docenteService: DocenteService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Cadastrar Docente');

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params.id) {
        this.docenteService.buscar(params.id).subscribe( data => {
          this.docente = data;
        });
      }
    });
  }

  onSubmit() {
    if(this.docente._id) {
      this.docenteService.alterar(this.docente).then( (res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
      })
      .catch( (res: any) => {
        this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
      });
    }
    else {
      this.docenteService.inserir(this.docente).then( (res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
        this.docente = {};
      })
      .catch( (res: any) => {
        this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
      });
    }
  }

}
