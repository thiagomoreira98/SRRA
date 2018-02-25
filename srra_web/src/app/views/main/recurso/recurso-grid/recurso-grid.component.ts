import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { RecursoService } from '../recurso.service';

@Component({
  selector: 'app-recurso-grid',
  templateUrl: './recurso-grid.component.html',
  styleUrls: ['./recurso-grid.component.scss']
})

export class RecursoGridComponent implements OnInit {

  recursos: any = [];
  filtro: any = {};
  totalPaginas: number;
  totalRegistros: number;
  buscando: boolean = true;

  constructor(
    private service: RecursoService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.navComponent.setTitle('Recursos');
    this.activatedRoute.params.subscribe((params: Params) => {
      this.filtro = params;
      this.selecionar();
  });
  }

  selecionar() {
    this.service.selecionar(this.filtro).subscribe((data: any) => {
      this.recursos = data.content.registros;
      this.totalRegistros = data.content.totalRegistros;
      this.totalPaginas = this.calcularTotalPaginas((this.totalRegistros / this.filtro.quantidade).toString());
      this.buscando = false;
    }, (res: any) => {
      this.buscando = false;
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
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
      this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
      this.selecionar();
    }).catch((res: any) => {
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
    });
  }
}