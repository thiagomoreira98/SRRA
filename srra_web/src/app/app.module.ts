import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SMNUIModule } from 'ng-smn-ui';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RecursoModule } from './recurso/recurso.module';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
// import { UiSnackbarComponent } from './snackbar/snackbar.component';
// import { UiSnackbarContainerComponent } from './snackbar/snackbar-container.component';

import { RecursoService } from './recurso/recurso.service';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    NavComponent,
    HomeComponent,
    // UiSnackbarComponent,
    // UiSnackbarContainerComponent
  ],
  imports: [
    BrowserModule,
    SMNUIModule,
    RecursoModule,
    AppRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [RecursoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
