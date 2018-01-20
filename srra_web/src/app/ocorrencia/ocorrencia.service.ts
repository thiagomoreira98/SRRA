import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class OcorrenciaService {

  constructor(private http: HttpClient) { }

  selecionar(filtro) {
    let params = new HttpParams();

    for (let property in filtro) {
      params = params.append(property, filtro[property]);
    }

    return this.http.get(`${environment.urlApi}/api/ocorrencia`, { params: params });
  }

  buscar(id: any) {
    return this.http.get(`${environment.urlApi}/api/ocorrencia/${id}`);
  }

  inserir(ocorrencia: any) {
    return this.http.post(`${environment.urlApi}/api/ocorrencia`, ocorrencia).toPromise();
  }

  alterar(ocorrencia: any) {
    return this.http.put(`${environment.urlApi}/api/ocorrencia/${ocorrencia.id}`, ocorrencia).toPromise();
  }

  deletar(id: any) {
    return this.http.delete(`${environment.urlApi}/api/ocorrencia/${id}`).toPromise();
  }
}
