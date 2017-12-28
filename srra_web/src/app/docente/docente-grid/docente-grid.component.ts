import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
import { DocenteService } from '../docente.service';

@Component({
  selector: 'app-docente-grid',
  templateUrl: './docente-grid.component.html',
  styleUrls: ['./docente-grid.component.scss']
})
export class DocenteGridComponent implements OnInit {

  docentes: any = [];
  filtro: any = {};

  constructor(
    private navComponent: NavComponent,
    private docenteService: DocenteService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Docentes');
    this.selecionar();
  }

  selecionar(): any {
    this.docenteService.selecionar().subscribe(data => {
      this.docentes = data;
    });
  }

  deletar(id): any {
    this.docenteService.deletar(id).then((res: any) => {
      this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
      this.selecionar();
    }).catch((res: any) => {
      this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
    });
  }

}
