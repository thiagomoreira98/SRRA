import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { DocenteService } from '../docente.service';

@Component({
  selector: 'app-docente-info',
  templateUrl: './docente-info.component.html',
  styleUrls: ['./docente-info.component.scss']
})
export class DocenteInfoComponent implements OnInit {

  docente: any = {};

  constructor(private docenteService: DocenteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params.id
      this.docenteService.getDocenteById(id).subscribe( data => {
        this.docente = data;
      });
    })
  }

  alterarDocente() {
    this.docenteService.putDocente(this.docente._id, this.docente);
  }

}
