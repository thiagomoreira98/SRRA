import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { RecursoService } from '../../recurso/recurso.service';
import { DocenteService } from '../../docente/docente.service';
import { OcorrenciaService } from '../../ocorrencia/ocorrencia.service';

@Component({
  selector: 'app-ocorrencia-form',
  templateUrl: './ocorrencia-form.component.html',
  styleUrls: ['./ocorrencia-form.component.scss']
})
export class OcorrenciaFormComponent implements OnInit {

  ocorrencia: any = {};
  recursos: any = [];
  docentes: any = [];
  today: Date;


  constructor(
    private recursoService: RecursoService,
    private docenteService: DocenteService,
    private ocorrenciaService: OcorrenciaService,
    private snackbar: MdSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.ocorrenciaService.buscar(params.id).subscribe( data => {
        this.ocorrencia = data;
      });
    });

    this.today = new Date();
    this.recursosDropdown();
    this.docentesDropdown();
  }


  recursosDropdown() {
    this.recursoService.selecionar().subscribe(data => {
      this.recursos = data;
    });
  }

  docentesDropdown() {
    this.docenteService.selecionar().subscribe(data => {
      this.docentes = data;
    });
  }

  cadastrar() {
    this.ocorrenciaService.inserir(this.ocorrencia).then( () => {
      this.snackbar.open('Cadastrado com Sucesso!', 'Fechar', { duration: 3000});
    })
      .catch( () => {
        this.snackbar.open('Erro ao Cadastrar!', 'Fechar', { duration: 3000});
      });
  }

}
