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
  funcoes: any = [];

  constructor(
    private navComponent: NavComponent,
    private service: DocenteService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Cadastrar Docente');

    this.funcaoDropdown();

    this.activatedRoute.params.subscribe((params: Params) => {
      if(params.id) {
        this.service.buscar(params.id).subscribe( (data: any) => {
          this.docente = data.content;
        });
      }
    });
  }

  funcaoDropdown() {
    this.service.selecionarFuncao().subscribe((data: any) => {
      this.funcoes = data.content;
    }, (res: any) => {
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });  
    });
  }

  onSubmit() {
    console.log(this.docente);
    if(this.docente.id) {
      this.service.alterar(this.docente).then( (res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
      })
      .catch( (res: any) => {
        this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
      });
    }
    else {
      this.service.inserir(this.docente).then( (res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
        this.docente = {};
      })
      .catch( (res: any) => {
        console.log(res);
        this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
      });
    }
  }

}
