import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RecursoFormComponent } from './recurso/recurso-form/recurso-form.component';
import { RecursoGridComponent } from "./recurso/recurso-grid/recurso-grid.component";
import { RecursoInfoComponent } from './recurso/recurso-info/recurso-info.component';
// import {PeopleComponent} from './people/people.component';
// import {SupplierComponent} from "./supplier/supplier.component";
// import {UserComponent} from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'recurso-grid',  component: RecursoGridComponent },
  { path: 'recurso-form', component: RecursoFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recurso-info/:id', component: RecursoInfoComponent}
  // { path: 'recursoForm',  component: RecursoFormComponent },
  // { path: 'people',  component: PeopleComponent },
  // { path: 'suppliers',  component: SupplierComponent },
  // { path: 'users', component: UserComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}