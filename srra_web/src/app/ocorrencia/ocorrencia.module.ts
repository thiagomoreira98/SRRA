import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SMNUIModule } from 'ng-smn-ui';
import { AppRoutingModule } from '../app-routing.module';

import { OcorrenciaFormComponent } from './ocorrencia-form/ocorrencia-form.component';
import { OcorrenciaGridComponent } from './ocorrencia-grid/ocorrencia-grid.component';

@NgModule({
  imports: [
    SMNUIModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule
  ],
  declarations: [
    OcorrenciaFormComponent,
    OcorrenciaGridComponent,
  ],
  exports: [
    OcorrenciaFormComponent,
    OcorrenciaGridComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OcorrenciaModule { }
