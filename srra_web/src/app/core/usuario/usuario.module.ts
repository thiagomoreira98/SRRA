import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatSelectModule, MatCardModule, MatButtonModule } from '@angular/material';

import { SMNUIModule } from 'ng-smn-ui';
import { CoreRoutingModule } from '../core-routing.module'

import { UsuarioGridComponent } from './usuario-grid/usuario-grid.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioFiltroComponent } from './usuario-filtro/usuario-filtro.component';

import { UsuarioService } from './usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SMNUIModule,
    CoreRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [
    UsuarioFormComponent,
    UsuarioGridComponent,
    UsuarioFiltroComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ UsuarioService ]
})
export class UsuarioModule { }
