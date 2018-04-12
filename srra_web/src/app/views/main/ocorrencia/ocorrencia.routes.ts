import { Routes } from "@angular/router";
import { OcorrenciaComponent } from './ocorrencia.component';
import { OcorrenciaListComponent } from "./list/ocorrencia.list.component";
import { OcorrenciaInfoComponent } from "./info/ocorrencia.info.component";

export const OCORRENCIA_ROUTES: Routes = [
    {
        path: 'ocorrencia',
        component: OcorrenciaComponent,
        children: [
            { path: '', component: OcorrenciaListComponent },
            { path: 'nova', component: OcorrenciaInfoComponent },
            { path: ':id', component: OcorrenciaInfoComponent }
        ]
    }
];