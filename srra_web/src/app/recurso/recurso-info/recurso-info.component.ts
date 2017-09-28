import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { RecursoService } from '../recurso.service';

@Component({
  selector: 'app-recurso-info',
  templateUrl: './recurso-info.component.html',
  styleUrls: ['./recurso-info.component.scss']
})
export class RecursoInfoComponent implements OnInit {

  recurso: any = {};

  constructor(
    private recursoService: RecursoService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.recursoService.buscar(params.id).subscribe( data => {
        this.recurso = data;
      });
    });
  }

  alterar() {
    this.recursoService.alterar(this.recurso._id, this.recurso)
      .then( () => {
        this.snackbar.open('Alterado com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch( () => {
        this.snackbar.open('Erro ao Alterar!', 'Fechar', { duration: 3000 } );
      });
  }

}
