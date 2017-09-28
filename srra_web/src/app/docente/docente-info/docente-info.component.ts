import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { DocenteService } from '../docente.service';

@Component({
  selector: 'app-docente-info',
  templateUrl: './docente-info.component.html',
  styleUrls: ['./docente-info.component.scss']
})
export class DocenteInfoComponent implements OnInit {

  docente: any = {};

  constructor(
    private docenteService: DocenteService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.docenteService.getDocenteById(params.id).subscribe( data => {
        this.docente = data;
      });
    });
  }

  alterar() {
    this.docenteService.putDocente(this.docente._id, this.docente)
      .then(() => {
        this.snackbar.open('Alterado com Sucesso!', 'Fechar', { duration: 3000})
      })
      .catch( () => {
        this.snackbar.open('Erro ao Alterar!', 'Fechar', { duration: 3000})
      });
  }

}
