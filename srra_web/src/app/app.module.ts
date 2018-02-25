import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { AuthModule } from './views/auth/auth.module';
import { ErrorModule } from './views/error/error.module';
import { MainModule } from './views/main/main.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    AuthModule,
    ErrorModule,
    MainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }