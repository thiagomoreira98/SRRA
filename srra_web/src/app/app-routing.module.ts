import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecursoFormComponent } from './recurso/-form.component';
import {HomeComponent} from "./home/home.component";
import {PeopleComponent} from './people/people.component';
import {SupplierComponent} from "./supplier/supplier.component";
import {UserComponent} from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'customers',  component: CustomerComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'people',  component: PeopleComponent },
  { path: 'suppliers',  component: SupplierComponent },
  { path: 'users', component: UserComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}