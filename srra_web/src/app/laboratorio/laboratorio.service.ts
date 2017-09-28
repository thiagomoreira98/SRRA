import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment';

@Injectable()
export class LaboratorioService {

  constructor(private http: HttpClient) { }

  selecionar(): any {
    return this.http.get(environment.urlApi + '/api/laboratorio');
  }

  buscar(id: any): any {
    return this.http.get(environment.urlApi + '/api/laboratorio/' + id);
  }

  inserir(laboratorio: any) {
    return this.http.post(environment.urlApi + '/api/laboratorio', laboratorio).toPromise();
  }

  alterar(id: any, laboratorio: any) {
    return this.http.put(environment.urlApi + '/api/laboratorio/' + id, laboratorio).toPromise();
  }

  deletar(id: any) {
    return this.http.delete(environment.urlApi + '/api/laboratorio/' + id).toPromise();
  }
}
