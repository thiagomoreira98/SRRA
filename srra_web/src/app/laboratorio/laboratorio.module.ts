import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SMNUIModule } from 'ng-smn-ui';
import { AppRoutingModule } from '../app-routing.module';

import { LaboratorioFormComponent } from './laboratorio-form/laboratorio-form.component';
import { LaboratorioGridComponent } from './laboratorio-grid/laboratorio-grid.component';
import { LaboratorioInfoComponent } from './laboratorio-info/laboratorio-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SMNUIModule,
    AppRoutingModule
  ],
  declarations: [
    LaboratorioFormComponent,
    LaboratorioGridComponent,
    LaboratorioInfoComponent
],
  exports: [
    LaboratorioFormComponent,
    LaboratorioGridComponent,
    LaboratorioInfoComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LaboratorioModule { }
