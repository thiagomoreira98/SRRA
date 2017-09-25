import { Component, OnInit } from '@angular/core';

import { RecursoService } from '../recurso.service';

@Component({
  selector: 'app-recurso-form',
  templateUrl: './recurso-form.component.html',
  styleUrls: ['./recurso-form.component.scss'],
  //providers: [ RecursoService ]
})
export class RecursoFormComponent implements OnInit {

  recurso: any = {}

  constructor(private recursoService : RecursoService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.recurso);
    this.recursoService.postRecurso(this.recurso);
  }

}
