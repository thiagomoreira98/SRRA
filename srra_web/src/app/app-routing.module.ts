import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RecursoFormComponent } from './recurso/recurso-form/recurso-form.component';
import { RecursoGridComponent } from "./recurso/recurso-grid/recurso-grid.component";
import { RecursoInfoComponent } from './recurso/recurso-info/recurso-info.component';
import { DocenteFormComponent } from './docente/docente-form/docente-form.component';
import { DocenteGridComponent } from "./docente/docente-grid/docente-grid.component";
import { DocenteInfoComponent } from './docente/docente-info/docente-info.component';
import { LaboratorioFormComponent } from './laboratorio/laboratorio-form/laboratorio-form.component';
import { LaboratorioGridComponent } from "./laboratorio/laboratorio-grid/laboratorio-grid.component";
import { LaboratorioInfoComponent } from './laboratorio/laboratorio-info/laboratorio-info.component';
import { OcorrenciaFormComponent } from './ocorrencia/ocorrencia-form/ocorrencia-form.component';
import { OcorrenciaGridComponent } from "./ocorrencia/ocorrencia-grid/ocorrencia-grid.component";
import { OcorrenciaInfoComponent } from './ocorrencia/ocorrencia-info/ocorrencia-info.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'recursos',  component: RecursoGridComponent },
  { path: 'recursos/cadastrar', component: RecursoFormComponent },
  { path: 'recursos/info/:id', component: RecursoInfoComponent},
  { path: 'docentes', component: DocenteGridComponent },
  { path: 'docentes/cadastrar', component: DocenteFormComponent },
  { path: 'docentes/info/:id', component: DocenteInfoComponent },
  { path: 'laboratorios', component: LaboratorioGridComponent },
  { path: 'laboratorios/cadastrar', component: LaboratorioFormComponent },
  { path: 'laboratorios/info/:id', component: LaboratorioInfoComponent },
  { path: 'ocorrencias', component: OcorrenciaGridComponent },
  { path: 'ocorrencias/cadastrar', component: OcorrenciaFormComponent },
  { path: 'ocorrencias/info/:id', component: OcorrenciaInfoComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
