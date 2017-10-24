import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  title: String;

  constructor() { }

  ngOnInit() {
  }

  setTitle(title) {
    this.title = title;
  }

}
