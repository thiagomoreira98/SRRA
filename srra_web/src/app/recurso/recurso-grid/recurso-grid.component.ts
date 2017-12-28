import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
import { RecursoService } from '../recurso.service';

@Component({
  selector: 'app-recurso-grid',
  templateUrl: './recurso-grid.component.html',
  styleUrls: ['./recurso-grid.component.scss']
})

export class RecursoGridComponent implements OnInit {

  recursos: any = [];
  filtro: String;

  constructor(
    private navComponent: NavComponent,
    private recursoService: RecursoService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Recursos');
    this.selecionar();
  }

  selecionar(): any {
    this.recursoService.selecionar(this.filtro).subscribe(data => {
      this.recursos = data;
    });
  }

  deletar(id): any {
    this.recursoService.deletar(id).then((res: any) => {
      this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
      this.selecionar();
    }).catch((res: any) => {
      this.snackbar.open(res.error.message ? res.error.message : 'Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
    });
  }
}
