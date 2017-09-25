import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SMNUIModule } from 'ng-smn-ui';
import { AppRoutingModule } from '../app-routing.module'
import { DocenteGridComponent } from './docente-grid/docente-grid.component';
import { DocenteFormComponent } from './docente-form/docente-form.component';
import { DocenteInfoComponent } from './docente-info/docente-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SMNUIModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    DocenteFormComponent,
    DocenteGridComponent,
    DocenteInfoComponent
  ],
  exports: [
    DocenteFormComponent,
    DocenteGridComponent,
    DocenteInfoComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DocenteModule { }
