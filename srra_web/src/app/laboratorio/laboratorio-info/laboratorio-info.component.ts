import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { LaboratorioService } from '../laboratorio.service';

@Component({
  selector: 'app-laboratorio-info',
  templateUrl: './laboratorio-info.component.html',
  styleUrls: ['./laboratorio-info.component.scss']
})
export class LaboratorioInfoComponent implements OnInit {
  
  laboratorio: any = {};
  
  constructor(private LaboratorioService : LaboratorioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let id = params.id
      this.LaboratorioService.getLaboratorioById(id).subscribe( data => {
        this.laboratorio = data;
      });
    })
  }

  alterarLaboratorio() {
    this.LaboratorioService.putLaboratorio(this.laboratorio._id, this.laboratorio);
  }
}
