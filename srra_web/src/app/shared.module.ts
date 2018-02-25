import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SMNUIModule, UiToolbarService } from 'ng-smn-ui';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { AuthGuard } from "./views/auth/guard/auth.guard";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [],
    exports: [
        FormsModule,
        BrowserModule,
        SMNUIModule,
        HttpModule,
        HttpClientModule,
        RouterModule
    ],
    providers: [
        UiToolbarService,
        AuthGuard
    ],
    bootstrap: []
})

export class SharedModule { }