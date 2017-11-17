import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class RecursoService {

  constructor(private http: HttpClient) { }

  selecionar(): any {
    return this.http.get(`${environment.urlApi}/api/recurso`);
  }

  buscar(id: any): any {
    return this.http.get(`${environment.urlApi}/api/recurso/${id}`);
  }

  inserir(recurso: any) {
    return this.http.post(`${environment.urlApi}/api/recurso`, recurso).toPromise();
  }

  alterar(recurso: any) {
    return this.http.put(`${environment.urlApi}/api/recurso/${recurso._id}`, recurso).toPromise();
  }

  deletar(id: any) {
    return this.http.delete(`${environment.urlApi}/api/recurso/${id}`).toPromise();
  }
}
