import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
// import { Observable } from 'rxjs/Observable';
// import { startWith } from 'rxjs/operators/startWith';
// import { map } from 'rxjs/operators/map';

import { RecursoService } from '../../recurso/recurso.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { OcorrenciaService } from '../../ocorrencia/ocorrencia.service';

import { NavComponent } from '../../nav/nav.component';

@Component({
  selector: 'app-ocorrencia-form',
  templateUrl: './ocorrencia-form.component.html',
  styleUrls: ['./ocorrencia-form.component.scss']
})
export class OcorrenciaFormComponent implements OnInit {

  ocorrencia: any = {};
  recursos: any = [];
  usuarios: any = [];
  filtroDocente: any = {
    pagina: 1,
    quantidade: 10
  }

  filtroRecurso: any = {
    pagina: 1,
    quantidade: 10
  }


  // recursoCtrl: FormControl;
  // docenteCtrl: FormControl;
  // filteredRecursos: Observable<any[]>;
  // filteredDocentes: Observable<any[]>;

  constructor(
    private navComponent: NavComponent,
    private recursoService: RecursoService,
    private docenteService: UsuarioService,
    private ocorrenciaService: OcorrenciaService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) {

    // this.recursoCtrl = new FormControl();
    // this.filteredRecursos = this.recursoCtrl.valueChanges.pipe(
    //   startWith(''),
    //   map(recurso => recurso ? this.filterRecursos(recurso) : this.recursos.slice())
    // );

    // this.docenteCtrl = new FormControl();
    // this.filteredDocentes = this.docenteCtrl.valueChanges.pipe(
    //   startWith(''),
    //   map(docente => docente ? this.filterDocentes(docente) : this.docentes.slice())
    // );

  }

  // filterRecursos(nome: any) {
  //   return this.recursos.filter(recurso =>
  //     recurso.nome.toLowerCase().indexOf(nome.toLowerCase()) === 0);
  // }

  // filterDocentes(nome: any) {
  //   return this.docentes.filter(docente =>
  //     docente.nome.toLowerCase().indexOf(nome.toLowerCase()) === 0);
  // }

  ngOnInit() {
    this.recursosDropdown();
    this.usuariosDropdown();
    this.buscar();

    if (this.ocorrencia.id) {
      this.navComponent.setTitle('Alterar Ocorrência');
    }
    else {
      this.navComponent.setTitle('Cadastrar Ocorrência');
    }
  }

  buscar() {
    if (this.activatedRoute.params) {
      this.activatedRoute.params.subscribe((params: Params) => {
        if (params.id) {
          this.ocorrenciaService.buscar(params.id).subscribe((data: any) => {
            this.ocorrencia = data.content;
          }, (res: any) => {
            this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
          });
        }
      });
    }
  }

  recursosDropdown() {
    this.recursoService.selecionar(this.filtroRecurso).subscribe((data: any) => {
      this.recursos = data.content.registros;
      console.log('recursos: ', this.recursos);
    }, (res: any) => {
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 })
    });
  }

  usuariosDropdown() {
    this.docenteService.selecionar(this.filtroDocente).subscribe((data: any) => {
      this.usuarios = data.content.registros;
      console.log('usuarios: ', this.usuarios);
    }, (res: any) => {
      this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 })
    });
  }

  selecionarIdUsuario(usuario) {
    this.ocorrencia.usuario = usuario.id;
  }

  selecionarIdRecurso(recurso) {
    this.ocorrencia.docente = recurso.id;
  }

  // idRecurso: any;
  // changeRecurso(recurso: any) {
  //   this.idRecurso = recurso._id;
  // }

  // idDocente: any;
  // changeDocente(docente: any) {
  //   this.idDocente = docente._id;
  // }

  onSubmit() {
    // this.ocorrencia.recurso = this.idRecurso;
    // this.ocorrencia.docente = this.idDocente;
    if (this.ocorrencia.id) {
      this.ocorrenciaService.alterar(this.ocorrencia).then((res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
      }).catch((res) => {
        this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 })
      })
    }
    else {
      this.ocorrenciaService.inserir(this.ocorrencia).then((res: any) => {
        this.snackbar.open(res.message, 'Fechar', { duration: 3000 });
        this.ocorrencia = {};
      }).catch((res: any) => {
        this.snackbar.open('Ocorreu um erro no servidor.', 'Fechar', { duration: 3000 });
      });
    }
  }
}
