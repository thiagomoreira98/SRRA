import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../../core/utils/user/user.service';
import { environment } from './../../../../environments/environment';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) { }

  selecionar(filtro: any) {
    let params = new HttpParams();

    for (let property in filtro) {
      params = params.append(property, filtro[property]);
    }

    let headers = new HttpHeaders({ 'Authentication': UserService.getCookie() });
    console.log(headers);
    return this.http.get(`${environment.urlApiSeguranca}/api/usuario`, { params: params, headers: headers });
  }

  buscar(id: any) {
    return this.http.get(`${environment.urlApiSeguranca}/api/usuario/${id}`);
  }

  inserir(usuario: any) {
    return this.http.post(`${environment.urlApiSeguranca}/api/usuario`, usuario).toPromise();
  }

  alterar(usuario: any) {
    return this.http.put(`${environment.urlApiSeguranca}/api/usuario/${usuario.id}`, usuario).toPromise();
  }

  deletar(id: any) {
    return this.http.delete(`${environment.urlApi}/api/usuario/${id}`).toPromise();
  }
}
