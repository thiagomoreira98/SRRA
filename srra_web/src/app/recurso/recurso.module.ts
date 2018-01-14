import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatCardModule } from '@angular/material';

import { SMNUIModule } from 'ng-smn-ui';
import { AppRoutingModule } from '../app-routing.module'
import { RecursoFormComponent } from './recurso-form/recurso-form.component';
import { RecursoGridComponent } from './recurso-grid/recurso-grid.component';
import { RecursoFiltroComponent } from './recurso-filtro/recurso-filtro.component';

@NgModule({
  declarations: [
    RecursoFormComponent,
    RecursoGridComponent,
    RecursoFiltroComponent,
  ],
  imports: [
    SMNUIModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    SMNUIModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RecursoModule { }
