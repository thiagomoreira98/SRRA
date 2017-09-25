import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SMNUIModule } from 'ng-smn-ui';
import { AppRoutingModule } from '../app-routing.module'
import { RecursoFormComponent } from './recurso-form/recurso-form.component';
import { RecursoGridComponent } from './recurso-grid/recurso-grid.component';
import { RecursoInfoComponent } from './recurso-info/recurso-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SMNUIModule,
    AppRoutingModule
  ],
  declarations: [
    RecursoFormComponent,
    RecursoGridComponent,
    RecursoInfoComponent
  ],
  exports: [
    RecursoFormComponent,
    RecursoGridComponent,
    RecursoInfoComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RecursoModule { }
