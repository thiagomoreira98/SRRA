import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-internal',
    templateUrl: './internal.component.html',
    styleUrls: ['./internal.component.scss']
})
export class InternalComponent implements OnInit, AfterViewInit {

    constructor(private titleService: Title) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.titleService.setTitle('SRRA');
    }

}