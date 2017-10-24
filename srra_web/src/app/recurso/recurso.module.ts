import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';

import { SMNUIModule } from 'ng-smn-ui';
import { AppRoutingModule } from '../app-routing.module'
import { RecursoFormComponent } from './recurso-form/recurso-form.component';
import { RecursoGridComponent } from './recurso-grid/recurso-grid.component';

@NgModule({
  imports: [
    SMNUIModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    RecursoFormComponent,
    RecursoGridComponent,
  ],
  exports: [
    RecursoFormComponent,
    RecursoGridComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RecursoModule { }
