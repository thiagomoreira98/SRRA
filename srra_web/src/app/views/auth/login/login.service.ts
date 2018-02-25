import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {

  }

  buscarDadosUsuario(email) {
    return this.http.post(`${environment.urlApiSeguranca}/api/auth`, { email: email }).toPromise();
  }

  fazerLogin(login) {
    return this.http.post(`${environment.urlApiSeguranca}/api/auth/login`, login).toPromise();
  }
  
  refazerLogin(headers) {
    return this.http.get(`${environment.urlApiSeguranca}/api/auth/refazer-login`, { headers: headers });
  }

}
