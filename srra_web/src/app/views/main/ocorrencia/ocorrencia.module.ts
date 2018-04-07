import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SMNUIModule } from 'ng-smn-ui';
import { SharedModule } from '../../../shared.module';

import { OcorrenciaComponent } from './ocorrencia.component';
import { OcorrenciaInfoComponent } from './info/ocorrencia.info.component';
import { OcorrenciaListComponent } from './list/ocorrencia.list.component';
import { OcorrenciaService } from './ocorrencia.service';

@NgModule({
  declarations: [
    OcorrenciaComponent,
    OcorrenciaInfoComponent,
    OcorrenciaListComponent
  ],
  imports: [
    SMNUIModule,
    SharedModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [OcorrenciaService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OcorrenciaModule { }
