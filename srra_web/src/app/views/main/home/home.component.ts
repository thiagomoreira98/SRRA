import { Component, OnInit } from '@angular/core';
import { UiToolbarService } from 'ng-smn-ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _toolbar: UiToolbarService
  ) { }

  ngOnInit() {
    this._toolbar.set('Home');
  }

}
