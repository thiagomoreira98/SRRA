import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../../core/utils/user/user.service';
import { environment } from './../../../../environments/environment';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) { }

  prepareHeaders() {
    return new HttpHeaders({ 'Authentication': UserService.getCookie() });
  }

  selecionar(filtro: any) {
    let params = new HttpParams();

    for (let property in filtro) {
      params = params.append(property, filtro[property]);
    }

    return this.http.get(`${environment.urlApiSeguranca}/api/usuario`, { params: params, headers: this.prepareHeaders() });
  }

  buscar(id: any) {
    return this.http.get(`${environment.urlApiSeguranca}/api/usuario/${id}`, { headers: this.prepareHeaders() });
  }

  inserir(usuario: any) {
    return this.http.post(`${environment.urlApiSeguranca}/api/usuario`, usuario, { headers: this.prepareHeaders() }).toPromise();
  }

  alterar(usuario: any) {
    return this.http.put(`${environment.urlApiSeguranca}/api/usuario/${usuario.id}`, usuario, { headers: this.prepareHeaders() }).toPromise();
  }

  deletar(id: any) {
    return this.http.delete(`${environment.urlApiSeguranca}/api/usuario/${id}`, { headers: this.prepareHeaders() }).toPromise();
  }

  //usuario Dropdown
  selecionarUsuarioDropdown() {
    return this.http.get(`${environment.urlApiSeguranca}/api/usuario-dropdown`, { headers: this.prepareHeaders() });
  }
}
