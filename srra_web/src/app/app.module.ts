import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';

import { NavComponent } from './nav/nav.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { SMNUIModule } from 'ng-smn-ui';
import { AppRoutingModule } from './app-routing.module';
import { RecursoModule } from './recurso/recurso.module';
import { DocenteModule } from './docente/docente.module';
import { LaboratorioModule } from './laboratorio/laboratorio.module';
import { OcorrenciaModule } from './ocorrencia/ocorrencia.module';

import { RecursoService } from './recurso/recurso.service';
import { DocenteService } from './docente/docente.service';
import { LaboratorioService } from './laboratorio/laboratorio.service';
import { OcorrenciaService } from './ocorrencia/ocorrencia.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    SMNUIModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatSelectModule,
    RecursoModule,
    DocenteModule,
    LaboratorioModule,
    OcorrenciaModule
  ],
  exports: [
    NavComponent
  ],
  providers: [
    RecursoService,
    DocenteService,
    LaboratorioService,
    OcorrenciaService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
