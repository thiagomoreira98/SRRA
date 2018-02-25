import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
// import { UiCookie } from 'ng-smn-ui';
import { UserService } from '../../../core/utils/user/user.service';
import { environment } from './../../../../environments/environment';

@Injectable()
export class GrupoService {

  constructor(private http: HttpClient) { }

  prepareHeaders() {
    return new HttpHeaders({ 'Authentication': UserService.getCookie() });
  }

  selecionar(filtro: any) {
    let params = new HttpParams();
    params = params.append('nome', filtro);
    return this.http.get(`${environment.urlApiSeguranca}/api/grupo`, { params: params, headers: this.prepareHeaders() });
  }

  selecionarDropdown() {
    return this.http.get(`${environment.urlApiSeguranca}/api/grupo-dropdown`, { headers: this.prepareHeaders() });
  }

  buscar(id: any) {
    return this.http.get(`${environment.urlApiSeguranca}/api/grupo/${id}`, { headers: this.prepareHeaders() });
  }

  inserir(grupo: any) {
    return this.http.post(`${environment.urlApiSeguranca}/api/grupo`, grupo, { headers: this.prepareHeaders() }).toPromise();
  }

  alterar(grupo: any) {
    return this.http.put(`${environment.urlApiSeguranca}/api/grupo/${grupo.id}`, grupo, { headers: this.prepareHeaders() }).toPromise();
  }

  deletar(id: any) {
    console.log('aqui', id);
    return this.http.delete(`${environment.urlApi}/api/grupo/${id}`, { headers: this.prepareHeaders() }).toPromise();
  }

  selecionarFuncionalidades() {
    return this.http.get(`${environment.urlApiSeguranca}/api/grupo-funcionalidade`, { headers: this.prepareHeaders() });
  }
}
