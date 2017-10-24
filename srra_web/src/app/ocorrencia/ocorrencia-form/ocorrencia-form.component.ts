import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
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

  constructor(
    private navComponent: NavComponent,
    private recursoService: RecursoService,
    private docenteService: DocenteService,
    private ocorrenciaService: OcorrenciaService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Cadastrar Ocorrência');

    this.activatedRoute.params.subscribe((params: Params) => {
      this.ocorrenciaService.buscar(params.id).subscribe( data => {
        this.ocorrencia = data;
      });
    });

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

  onSubmit() {
    if(this.ocorrencia._id) {
      this.ocorrenciaService.alterar(this.ocorrencia._id, this.ocorrencia).then( (data) => {
        this.ocorrencia = data;
        this.snackbar.open('Salvo com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch( (err) => {
        this.snackbar.open('Erro ao Salvar!', 'Fechar', { duration: 3000 })
      })
    }
    else {
      this.ocorrenciaService.inserir(this.ocorrencia).then( () => {
        this.snackbar.open('Cadastrado com Sucesso!', 'Fechar', { duration: 3000 });
      })
      .catch( () => {
        this.snackbar.open('Erro ao Cadastrar!', 'Fechar', { duration: 3000 });
      });
    }
  }
}
