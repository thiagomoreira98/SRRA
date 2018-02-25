import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SMNUIModule } from 'ng-smn-ui';
import { SharedModule } from '../../../shared.module';
import { UsuarioComponent } from './usuario.component';
import { UsuarioListComponent } from './list/usuario.list.component';
import { UsuarioInfoComponent } from './info/usuario.info.component';
import { UsuarioService } from './usuario.service';

@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioListComponent,
    UsuarioInfoComponent
  ],
  imports: [
    SMNUIModule,
    SharedModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ UsuarioService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class UsuarioModule { }