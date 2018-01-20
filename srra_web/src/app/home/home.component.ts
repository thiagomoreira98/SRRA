import { Component, OnInit } from '@angular/core';

import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private navComponent: NavComponent) { }

  ngOnInit() {
    this.navComponent.setTitle('Home');
  }

}
