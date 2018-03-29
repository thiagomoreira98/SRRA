import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { SMNUIModule } from 'ng-smn-ui';
import { RecursoComponent } from './recurso.component';
import { RecursoInfoComponent } from './info/recurso.info.component';
import { RecursoListComponent } from './list/recurso.list.component';
import { RecursoService } from './recurso.service';

@NgModule({
  declarations: [
    RecursoListComponent,
    RecursoInfoComponent,
    RecursoComponent,
  ],
  imports: [
    SMNUIModule,
    SharedModule
  ],
  providers: [ RecursoService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RecursoModule { }
