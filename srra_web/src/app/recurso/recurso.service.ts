import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';


@Injectable()
export class RecursoService {

  constructor(private http: HttpClient ) { }

  getRecursos(): any {
    return this.http.get(environment.urlApi + '/api/recurso');
  }

  postRecurso(recurso: any): any {
    return this.http.post(environment.urlApi + '/api/recurso', recurso);
  }
}
