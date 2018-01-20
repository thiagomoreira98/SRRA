import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule, MatListModule, MatExpansionModule, MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { SMNUIModule } from 'ng-smn-ui';
import { AppRoutingModule } from './app-routing.module';

import { RecursoModule } from './recurso/recurso.module';
import { DocenteModule } from './docente/docente.module';
// import { LaboratorioModule } from './laboratorio/laboratorio.module';
import { OcorrenciaModule } from './ocorrencia/ocorrencia.module';
import { ReservaModule } from './reserva/reserva.module';

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
    // LaboratorioModule,
    OcorrenciaModule,
    ReservaModule
  ],
  exports: [
    NavComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
