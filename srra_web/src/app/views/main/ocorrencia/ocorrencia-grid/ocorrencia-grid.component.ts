import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { OcorrenciaService } from '../ocorrencia.service';

@Component({
  selector: 'app-ocorrencia-grid',
  templateUrl: './ocorrencia-grid.component.html',
  styleUrls: ['./ocorrencia-grid.component.scss']
})
export class OcorrenciaGridComponent implements OnInit {

  ocorrencias: any = [];
  filtro: any = {};
  totalPaginas: number;
  totalRegistros: number;
  buscando: boolean = true;

  constructor(
    private service: OcorrenciaService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.navComponent.setTitle('Ocorrências');
    this.activatedRoute.params.subscribe((params: Params) => {
      this.filtro = params;
      this.selecionar();
    });
  }

  selecionar(): any {
    this.service.selecionar(this.filtro).subscribe((data: any) => {
      this.ocorrencias = data.content.registros;
      this.totalRegistros = data.content.totalRegistros;
      this.totalPaginas = this.calcularTotalPaginas((this.totalRegistros / this.filtro.quantidade).toString());
      this.buscando = false;
    }, (res: any) => {
      this.buscando = false;
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 })
    });
  }

  proximaPagina() {
    this.filtro.pagina += 1;
    this.selecionar();
  }

  voltarPagina() {
    this.filtro.pagina -= 1;
    this.selecionar();
  }

  calcularTotalPaginas(paginas): any {
    if (paginas.length > 1)
      return parseInt(paginas) + 1;

    return parseInt(paginas);
  }

  deletar(id): any {
    this.service.deletar(id).then((res: any) => {
      this.snackbar.open(res.message, 'Fechar', { duration: 3000 })
      this.selecionar();
    }).catch((res: any) => {
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 })
    });
  }
}