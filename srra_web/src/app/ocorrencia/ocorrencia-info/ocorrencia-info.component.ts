import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { OcorrenciaService } from '../ocorrencia.service';

@Component({
  selector: 'app-ocorrencia-info',
  templateUrl: './ocorrencia-info.component.html',
  styleUrls: ['./ocorrencia-info.component.scss']
})
export class OcorrenciaInfoComponent implements OnInit {

  ocorrencia: any = {};
  
  constructor(private ocorrenciaService: OcorrenciaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params.id
      this.ocorrenciaService.getOcorrenciaById(id).subscribe( data => {
        this.ocorrencia = data;
      });
    })
  }

  alterarOcorrencia() {
    this.ocorrenciaService.putOcorrencia(this.ocorrencia._id, this.ocorrencia);
  }
}
