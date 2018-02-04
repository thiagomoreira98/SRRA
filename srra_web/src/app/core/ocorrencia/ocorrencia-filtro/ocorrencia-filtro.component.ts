import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

import { NavComponent } from '../../nav/nav.component';
import { RecursoService } from '../../recurso/recurso.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { OcorrenciaService } from '../../ocorrencia/ocorrencia.service';

@Component({
  selector: 'app-ocorrencia-filtro',
  templateUrl: './ocorrencia-filtro.component.html',
  styleUrls: ['./ocorrencia-filtro.component.scss']
})
export class OcorrenciaFiltroComponent implements OnInit {

  docentes: any = [];
  recursos: any = [];
  filtro: any = {
    pagina: 1,
    quantidade: 10,
  };
  filtroDocente: any = {
    pagina: 1,
    quantidade: 10,  
  }
  filtroRecurso: any = {
    pagina: 1,
    quantidade: 10,  
  }

  constructor(
    private navComponent: NavComponent,
    private service: OcorrenciaService,
    private usuarioService: UsuarioService,
    private recursoService: RecursoService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.navComponent.setTitle('Buscar Ocorrências');
    this.recursosDropdown();
    this.usuariosDropdown();
  }

  recursosDropdown() {
    this.recursoService.selecionar(this.filtroRecurso).subscribe(data => {
      this.recursos = data.content.registros;
    }, (res: any) => {
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
    })
  }

  usuariosDropdown() {
    this.usuarioService.selecionar(this.filtroDocente).subscribe((data: any) => {
      this.docentes = data.content.registros;
    }, (res: any) => {
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
    });
  }

  proximaPaginaDocente() {
    this.filtroDocente.pagina += 1;
    this.usuariosDropdown();
  }

  proximaPaginaRecurso() {
    this.filtroRecurso.pagina += 1;
    this.recursosDropdown();
  }

  filtrar() {
    this.router.navigate(['ocorrencias', this.filtro]);
  }

}
