import { Routes } from "@angular/router";
import { UsuarioComponent } from './usuario.component';
import { UsuarioListComponent } from "./list/usuario.list.component";
import { UsuarioInfoComponent } from "./info/usuario.info.component";

export const USUARIO_ROUTES: Routes = [
    {
        path: 'usuario',
        component: UsuarioComponent,
        children: [
            { path: '', component: UsuarioListComponent },
            { path: 'novo', component: UsuarioInfoComponent },
            { path: ':id', component: UsuarioInfoComponent }
        ]
    }
];