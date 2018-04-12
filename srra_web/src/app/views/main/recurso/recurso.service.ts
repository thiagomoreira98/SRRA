import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../../core/utils/user/user.service';
import { environment } from './../../../../environments/environment';

@Injectable()
export class RecursoService {

  constructor(private http: HttpClient) { }

  prepareHeaders() {
    return new HttpHeaders({ 'Authentication': UserService.getCookie() });
  }

  selecionar(filtro): any {
    let params = new HttpParams();

    for (let property in filtro) {
      params = params.append(property, filtro[property]);
    }

    return this.http.get(`${environment.urlApi}/api/recurso`, { params: params, headers: this.prepareHeaders() });
  }

  buscar(id: any): any {
    return this.http.get(`${environment.urlApi}/api/recurso/${id}`, { headers: this.prepareHeaders() });
  }

  inserir(recurso: any) {
    return this.http.post(`${environment.urlApi}/api/recurso`, recurso, { headers: this.prepareHeaders() }).toPromise();
  }

  alterar(recurso: any) {
    return this.http.put(`${environment.urlApi}/api/recurso/${recurso.id}`, recurso, { headers: this.prepareHeaders() }).toPromise();
  }

  deletar(id: any) {
    return this.http.delete(`${environment.urlApi}/api/recurso/${id}`, { headers: this.prepareHeaders() }).toPromise();
  }

  //Tipo Recurso
  selecionarTipos() {
    return this.http.get(`${environment.urlApi}/api/tipo-recurso`, { headers: this.prepareHeaders() });
  }

  //Status Recurso
  selecionarStatus() {
    return this.http.get(`${environment.urlApi}/api/status-recurso`, { headers: this.prepareHeaders() });
  }

  //Recurso Dropdown
  selecionarRecursoDropdown() {
    return this.http.get(`${environment.urlApi}/api/recurso-dropdown`, { headers: this.prepareHeaders() });
  }
}
