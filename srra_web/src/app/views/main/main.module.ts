import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared.module";
import { HttpClientModule } from "@angular/common/http";
import { MainComponent } from './main.component';
import { UserService } from "../../core/utils/user/user.service";
import { HomeModule } from "./home/home.module";
import { UsuarioModule } from './usuario/usuario.module';
import { GrupoModule } from './grupo/grupo.module';
import { RecursoModule } from './recurso/recurso.module';
import { OcorrenciaModule } from './ocorrencia/ocorrencia.module';

@NgModule({
    imports: [
        HttpClientModule,
        SharedModule,
        HomeModule,
        UsuarioModule,
        GrupoModule,
        RecursoModule,
        OcorrenciaModule
    ],
    exports: [],
    declarations: [MainComponent],
    providers: [UserService],
})

export class MainModule { }