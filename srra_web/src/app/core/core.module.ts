import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule, MatListModule, MatExpansionModule, MatSelectModule, MatStepperModule } from '@angular/material';

import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { CoreComponent } from './core.component';

import { SMNUIModule } from 'ng-smn-ui';
import { CoreRoutingModule } from './core-routing.module';
import { RecursoModule } from './recurso/recurso.module';
import { UsuarioModule } from './usuario/usuario.module';
import { OcorrenciaModule } from './ocorrencia/ocorrencia.module';
import { ReservaModule } from './reserva/reserva.module';

@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    CoreComponent
  ],
  imports: [
    SMNUIModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatSelectModule,
    MatStepperModule,
    RecursoModule,
    UsuarioModule,
    OcorrenciaModule,
    ReservaModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CoreModule { }
