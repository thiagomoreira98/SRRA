import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../environments/environment';

@Injectable()
export class DocenteService {

  constructor(private http: HttpClient) { }

  selecionar(filtro: any) {
    let params = new HttpParams();

    for (let property in filtro) {
      params = params.append(property, filtro[property]);
    }

    return this.http.get(`${environment.urlApi}/api/docente`, { params: params });
  }

  buscar(id: any) {
    return this.http.get(`${environment.urlApi}/api/docente/${id}`);
  }

  inserir(docente: any) {
    return this.http.post(`${environment.urlApi}/api/docente`, docente).toPromise();
  }

  alterar(docente: any) {
    return this.http.put(`${environment.urlApi}/api/docente/${docente.id}`, docente).toPromise();
  }

  deletar(id: any) {
    return this.http.delete(`${environment.urlApi}/api/docente/${id}`).toPromise();
  }

  selecionarFuncao() {
    return this.http.get(`${environment.urlApi}/api/funcao`);
  }
}
