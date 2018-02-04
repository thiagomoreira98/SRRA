import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatCardModule } from '@angular/material';

import { SMNUIModule } from 'ng-smn-ui';
import { CoreRoutingModule } from '../core-routing.module';

import { OcorrenciaFormComponent } from './ocorrencia-form/ocorrencia-form.component';
import { OcorrenciaGridComponent } from './ocorrencia-grid/ocorrencia-grid.component';
import { OcorrenciaFiltroComponent } from './ocorrencia-filtro/ocorrencia-filtro.component';

import { OcorrenciaService } from './ocorrencia.service';

@NgModule({
  declarations: [
    OcorrenciaFormComponent,
    OcorrenciaGridComponent,
    OcorrenciaFiltroComponent,
  ],
  imports: [
    SMNUIModule,
    CoreRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCardModule
  ],
  providers: [ OcorrenciaService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OcorrenciaModule { }
