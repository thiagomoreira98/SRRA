import { Routes } from "@angular/router";
import { GrupoComponent } from './grupo.component';
import { GrupoListComponent } from "./list/grupo.list.component";
import { GrupoInfoComponent } from "./info/grupo.info.component";

export const GRUPO_ROUTES: Routes = [
    {
        path: 'grupo',
        component: GrupoComponent,
        children: [
            { path: '', component: GrupoListComponent },
            { path: 'novo', component: GrupoInfoComponent },
            { path: ':id', component: GrupoInfoComponent }
        ]
    }
];