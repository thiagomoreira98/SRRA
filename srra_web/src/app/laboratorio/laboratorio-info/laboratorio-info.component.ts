import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { LaboratorioService } from '../laboratorio.service';


@Component({
  selector: 'app-laboratorio-info',
  templateUrl: './laboratorio-info.component.html',
  styleUrls: ['./laboratorio-info.component.scss']
})
export class LaboratorioInfoComponent implements OnInit {

  laboratorio: any = {};

  constructor(
    private LaboratorioService: LaboratorioService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.LaboratorioService.buscar(params.id).subscribe( data => {
        this.laboratorio = data;
      });
    });
  }

  alterar() {
    this.LaboratorioService.alterar(this.laboratorio._id, this.laboratorio)
    .then( () => {
      this.snackbar.open('Alterado com Sucesso!', 'Fechar', { duration: 3000 });
    })
    .catch( () => {
      this.snackbar.open('Erro ao Alterar!', 'Fechar', { duration: 3000 } );
    });
  }
}
