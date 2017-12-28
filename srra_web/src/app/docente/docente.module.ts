import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material';

import { SMNUIModule } from 'ng-smn-ui';
import { AppRoutingModule } from '../app-routing.module'

import { DocenteGridComponent } from './docente-grid/docente-grid.component';
import { DocenteFormComponent } from './docente-form/docente-form.component';

import { DocenteService } from './docente.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    SMNUIModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    DocenteFormComponent,
    DocenteGridComponent,
  ],
  exports: [
    DocenteFormComponent,
    DocenteGridComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ DocenteService ]
})
export class DocenteModule { }
