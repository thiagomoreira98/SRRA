import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment';

@Injectable()
export class OcorrenciaService {

  constructor(private http: HttpClient) { }

  selecionar(): any {
    return this.http.get(`${environment.urlApi}/api/ocorrencia`);
  }

  buscar(id: any): any {
    return this.http.get(`${environment.urlApi}/api/ocorrencia/${id}`);
  }

  inserir(ocorrencia: any) {
    return this.http.post(`${environment.urlApi}/api/ocorrencia`, ocorrencia).toPromise();
  }

  alterar(id: any, ocorrencia: any) {
    return this.http.put(`${environment.urlApi}/api/ocorrencia/${id}`, ocorrencia).toPromise();
  }

  deletar(id: any) {
    return this.http.delete(`${environment.urlApi}/api/ocorrencia/${id}`).toPromise();
  }
}
