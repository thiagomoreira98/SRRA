import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NavComponent } from './nav/nav.component';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './app-routing.module';
import { SMNUIModule } from 'ng-smn-ui';
import { RecursoModule } from './recurso/recurso.module';
import { DocenteModule } from './docente/docente.module';
import { LaboratorioModule } from './laboratorio/laboratorio.module';
import { OcorrenciaModule } from './ocorrencia/ocorrencia.module';

import { RecursoService } from './recurso/recurso.service';
import { DocenteService } from './docente/docente.service';
import { LaboratorioService } from './laboratorio/laboratorio.service';
import { OcorrenciaService } from './ocorrencia/ocorrencia.service';

// import { UiSnackbarComponent } from './snackbar/snackbar.component';
// import { UiSnackbarContainerComponent } from './snackbar/snackbar-container.component';




@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    NavComponent,
    HomeComponent
    // UiSnackbarComponent,
    // UiSnackbarContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SMNUIModule,
    RecursoModule,
    DocenteModule,
    LaboratorioModule,
    OcorrenciaModule
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
