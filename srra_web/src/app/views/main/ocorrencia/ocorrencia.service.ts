import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../../core/utils/user/user.service';
import { environment } from './../../../../environments/environment';

@Injectable()
export class OcorrenciaService {

  constructor(private http: HttpClient) { }

  prepareHeaders() {
    return new HttpHeaders({ 'Authentication': UserService.getCookie() });
  }

  selecionar(filtro) {
    let params = new HttpParams();

    for (let property in filtro) {
      params = params.append(property, filtro[property]);
    }

    return this.http.get(`${environment.urlApi}/api/ocorrencia`, { params: params, headers: this.prepareHeaders() });
  }

  buscar(id: any) {
    return this.http.get(`${environment.urlApi}/api/ocorrencia/${id}`, { headers: this.prepareHeaders() });
  }

  inserir(ocorrencia: any) {
    return this.http.post(`${environment.urlApi}/api/ocorrencia`, ocorrencia, { headers: this.prepareHeaders() }).toPromise();
  }

  //Status Ocorrencia
  selecionarStatus() {
    return this.http.get(`${environment.urlApi}/api/status-ocorrencia`, { headers: this.prepareHeaders() });
  }
}
