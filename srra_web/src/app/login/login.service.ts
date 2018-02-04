import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  buscarDadosUsuario(usuario) {
    return this.http.get(`${environment.urlApi}/api/auth/${usuario}`);
  }

  fazerLogin(login) {
    return this.http.get(`${environment.urlApi}/api/auth/login/${login.id}/${login.senha}`);
  }

}
