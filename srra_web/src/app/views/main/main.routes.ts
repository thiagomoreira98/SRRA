import { Routes } from "@angular/router";
import { MainComponent } from "./main.component";
import { AuthGuard } from "../auth/guard/auth.guard";
import { HOME_ROUTES } from "./home/home.routes";
import { USUARIO_ROUTES } from "./usuario/usuario.routes";
import { GRUPO_ROUTES } from "./grupo/grupo.routes";

export const MAIN_ROUTES: Routes = [{
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
        ...HOME_ROUTES,
        ...USUARIO_ROUTES,
        ...GRUPO_ROUTES
    ]
}];