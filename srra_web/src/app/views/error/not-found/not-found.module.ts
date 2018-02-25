import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {NotFoundComponent} from './not-found.component';
import {SharedModule} from "../../../shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [],
    declarations: [NotFoundComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class NotFoundModule { }