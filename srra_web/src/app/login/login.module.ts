import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatStepperModule, MatCardModule, MatInputModule, MatButtonModule } from '@angular/material';

import { SMNUIModule } from 'ng-smn-ui';
import { AppRoutingModule } from '../app-routing.module';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SMNUIModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MatStepperModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [ LoginService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class LoginModule { }