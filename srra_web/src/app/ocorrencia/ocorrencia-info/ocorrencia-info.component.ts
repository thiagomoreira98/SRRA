import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { OcorrenciaService } from '../ocorrencia.service';

@Component({
  selector: 'app-ocorrencia-info',
  templateUrl: './ocorrencia-info.component.html',
  styleUrls: ['./ocorrencia-info.component.scss']
})
export class OcorrenciaInfoComponent implements OnInit {

  ocorrencia: any = {};

  constructor(
    private ocorrenciaService: OcorrenciaService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MdSnackBar
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.ocorrenciaService.buscar(params.id).subscribe( data => {
        this.ocorrencia = data;
      });
    });
  }

  alterar() {
    this.ocorrenciaService.alterar(this.ocorrencia._id, this.ocorrencia)
      .then( () => {
        this.snackbar.open('Alterado com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch( () => {
        this.snackbar.open('Erro ao Alterar!', 'Fechar', { duration: 3000 });
      });
  }
}
