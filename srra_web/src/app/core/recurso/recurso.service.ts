import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class RecursoService {

  constructor(private http: HttpClient) { }

  selecionar(filtro): any {
    let params = new HttpParams();

    for (let property in filtro) {
      params = params.append(property, filtro[property]);
    }

    return this.http.get(`${environment.urlApi}/api/recurso`, { params: params });
  }

  buscar(id: any): any {
    return this.http.get(`${environment.urlApi}/api/recurso/${id}`);
  }

  inserir(recurso: any) {
    return this.http.post(`${environment.urlApi}/api/recurso`, recurso).toPromise();
  }

  alterar(recurso: any) {
    return this.http.put(`${environment.urlApi}/api/recurso/${recurso.id}`, recurso).toPromise();
  }

  deletar(id: any) {
    return this.http.delete(`${environment.urlApi}/api/recurso/${id}`).toPromise();
  }

  //Tipo Recurso
  selecionarTipoRecurso() {
    return this.http.get(`${environment.urlApi}/api/tipo-recurso`);  
  }

  //Status Recurso
  selecionarStatusRecurso() {
    return this.http.get(`${environment.urlApi}/api/status-recurso`);  
  }
}
