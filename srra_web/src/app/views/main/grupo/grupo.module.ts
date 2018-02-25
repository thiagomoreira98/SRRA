import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SMNUIModule } from 'ng-smn-ui';
import { SharedModule } from '../../../shared.module';
import { GrupoComponent } from './grupo.component';
import { GrupoListComponent } from './list/grupo.list.component';
import { GrupoInfoComponent } from './info/grupo.info.component';
import { GrupoService } from './grupo.service';

@NgModule({
    declarations: [
        GrupoComponent,
        GrupoListComponent,
        GrupoInfoComponent
    ],
    imports: [
        SMNUIModule,
        SharedModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    providers: [GrupoService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class GrupoModule { }