import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatCardModule } from '@angular/material';

import { SMNUIModule } from 'ng-smn-ui';

import { ReservaFormComponent } from './reserva-form/reserva-form.component';
import { ReservaGridComponent } from './reserva-grid/reserva-grid.component';
import { ReservaFiltroComponent } from './reserva-filtro/reserva-filtro.component';

import { ReservaService } from './reserva.service';

@NgModule({
  declarations: [
    ReservaFormComponent,
    ReservaGridComponent,
    ReservaFiltroComponent
  ],
  imports: [
    SMNUIModule,
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
  providers: [ ReservaService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ReservaModule { }
