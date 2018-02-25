import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, AfterViewInit {

    constructor(private titleService: Title) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.titleService.setTitle('SRRA');
    }

}