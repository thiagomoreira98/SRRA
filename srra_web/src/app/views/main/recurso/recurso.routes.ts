import { Routes } from "@angular/router";
import { RecursoComponent } from './recurso.component';
import { RecursoListComponent } from "./list/recurso.list.component";
import { RecursoInfoComponent } from "./info/recurso.info.component";

export const RECURSO_ROUTES: Routes = [
    {
        path: 'recurso',
        component: RecursoComponent,
        children: [
            { path: '', component: RecursoListComponent },
            { path: 'novo', component: RecursoInfoComponent },
            { path: ':id', component: RecursoInfoComponent }
        ]
    }
];