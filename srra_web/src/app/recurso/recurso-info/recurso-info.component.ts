import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { RecursoService } from '../recurso.service';

@Component({
  selector: 'app-recurso-info',
  templateUrl: './recurso-info.component.html',
  styleUrls: ['./recurso-info.component.scss']
})
export class RecursoInfoComponent implements OnInit {

  recurso: any = {};

  constructor(private recursoService : RecursoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params.id
      this.recursoService.getRecursoById(id).subscribe( data => {
        this.recurso = data;
      });
    })
  }

  alterarRecurso() {
    this.recursoService.putRecurso(this.recurso._id, this.recurso);
  }

}
