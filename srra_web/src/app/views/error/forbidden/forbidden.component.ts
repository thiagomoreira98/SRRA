import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-forbidden',
    templateUrl: './forbidden.component.html',
    styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit, AfterViewInit {

    constructor(private titleService: Title) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.titleService.setTitle('SRRA');
    }

}