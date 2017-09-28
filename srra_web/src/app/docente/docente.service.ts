import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment.prod';

@Injectable()
export class DocenteService {

  constructor(private http: HttpClient) { }

  selecionar() {
    return this.http.get(environment.urlApi + '/api/docente');
  }

  buscar(id: any): any {
    return this.http.get(environment.urlApi + '/api/docente/' + id);
  }

  inserir(docente: any) {
    return this.http.post(environment.urlApi + '/api/docente', docente).toPromise();
  }

  alterar(id: any, docente: any) {
    return this.http.put(environment.urlApi + '/api/docente/' + id, docente).toPromise();
  }

  deletar(id: any) {
    return this.http.delete(environment.urlApi + '/api/docente/' + id).toPromise();
  }
}
