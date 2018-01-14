import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

//Recursos
import { RecursoFormComponent } from './recurso/recurso-form/recurso-form.component';
import { RecursoGridComponent } from './recurso/recurso-grid/recurso-grid.component';
import { RecursoFiltroComponent } from './recurso/recurso-filtro/recurso-filtro.component';

//Docentes
import { DocenteFormComponent } from './docente/docente-form/docente-form.component';
import { DocenteGridComponent } from './docente/docente-grid/docente-grid.component';
import { DocenteFiltroComponent } from './docente/docente-filtro/docente-filtro.component';

//Ocorrencias
import { OcorrenciaFormComponent } from './ocorrencia/ocorrencia-form/ocorrencia-form.component';
import { OcorrenciaGridComponent } from './ocorrencia/ocorrencia-grid/ocorrencia-grid.component';
import { OcorrenciaFiltroComponent } from './ocorrencia/ocorrencia-filtro/ocorrencia-filtro.component';

//Reservas
import { ReservaFormComponent } from './reserva/reserva-form/reserva-form.component';
import { ReservaGridComponent } from './reserva/reserva-grid/reserva-grid.component';
import { ReservaFiltroComponent } from './reserva/reserva-filtro/reserva-filtro.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  //Recursos
  { path: 'recursos',  component: RecursoGridComponent },
  { path: 'recursos/filtro',  component: RecursoFiltroComponent },
  { path: 'recursos/novo', component: RecursoFormComponent },
  { path: 'recursos/info/:id', component: RecursoFormComponent },
  
  //Docentes
  { path: 'docentes', component: DocenteGridComponent },
  { path: 'docentes/filtro',  component: DocenteFiltroComponent },
  { path: 'docentes/novo', component: DocenteFormComponent },
  { path: 'docentes/info/:id', component: DocenteFormComponent },

  //Ocorrencias
  { path: 'ocorrencias', component: OcorrenciaGridComponent },
  { path: 'ocorrencias/filtro',  component: OcorrenciaFiltroComponent },
  { path: 'ocorrencias/nova', component: OcorrenciaFormComponent },
  { path: 'ocorrencias/info/:id', component: OcorrenciaFormComponent },

  //Reservas
  { path: 'reservas', component: ReservaGridComponent },
  { path: 'reservas/filtro',  component: ReservaFiltroComponent },
  { path: 'reservas/nova', component: ReservaFormComponent },
  { path: 'reservas/info/:id', component: ReservaFormComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
