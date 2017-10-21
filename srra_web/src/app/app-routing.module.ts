import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RecursoFormComponent } from './recurso/recurso-form/recurso-form.component';
import { RecursoGridComponent } from './recurso/recurso-grid/recurso-grid.component';

import { DocenteFormComponent } from './docente/docente-form/docente-form.component';
import { DocenteGridComponent } from './docente/docente-grid/docente-grid.component';

import { LaboratorioFormComponent } from './laboratorio/laboratorio-form/laboratorio-form.component';
import { LaboratorioGridComponent } from './laboratorio/laboratorio-grid/laboratorio-grid.component';

import { OcorrenciaFormComponent } from './ocorrencia/ocorrencia-form/ocorrencia-form.component';
import { OcorrenciaGridComponent } from './ocorrencia/ocorrencia-grid/ocorrencia-grid.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'recursos',  component: RecursoGridComponent },
  { path: 'recursos/cadastrar', component: RecursoFormComponent },
  { path: 'recursos/info/:id', component: RecursoFormComponent},
  { path: 'docentes', component: DocenteGridComponent },
  { path: 'docentes/cadastrar', component: DocenteFormComponent },
  { path: 'docentes/info/:id', component: DocenteFormComponent },
  { path: 'laboratorios', component: LaboratorioGridComponent },
  { path: 'laboratorios/cadastrar', component: LaboratorioFormComponent },
  { path: 'laboratorios/info/:id', component: LaboratorioFormComponent },
  { path: 'ocorrencias', component: OcorrenciaGridComponent },
  { path: 'ocorrencias/cadastrar', component: OcorrenciaFormComponent },
  { path: 'ocorrencias/info/:id', component: OcorrenciaFormComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
