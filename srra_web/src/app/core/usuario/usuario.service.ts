import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../../environments/environment';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) { }

  selecionar(filtro: any) {
    let params = new HttpParams();

    for (let property in filtro) {
      params = params.append(property, filtro[property]);
    }

    return this.http.get(`${environment.urlApi}/api/usuario`, { params: params });
  }

  buscar(id: any) {
    return this.http.get(`${environment.urlApi}/api/usuario/${id}`);
  }

  inserir(usuario: any) {
    return this.http.post(`${environment.urlApi}/api/usuario`, usuario).toPromise();
  }

  alterar(usuario: any) {
    return this.http.put(`${environment.urlApi}/api/usuario/${usuario.id}`, usuario).toPromise();
  }

  deletar(id: any) {
    return this.http.delete(`${environment.urlApi}/api/usuario/${id}`).toPromise();
  }

  selecionarGrupo() {
    return this.http.get(`${environment.urlApi}/api/grupo`);
  }
}
