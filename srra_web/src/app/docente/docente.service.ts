import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment.prod';

@Injectable()
export class DocenteService {

  constructor(private http: HttpClient) { }

  getDocentes() {
    return this.http.get(environment.urlApi + '/api/docente');
  }

  getDocenteById(id: any): any {
    return this.http.get(environment.urlApi + '/api/docente/' + id);
  }

  postDocente(docente: any) {
    // console.log(Docente);
    return this.http.post(environment.urlApi + '/api/docente', docente).toPromise()
      .then( () => {
          console.log('ok');
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }

  putDocente(id: any, docente: any) {
    console.log(id);
    console.log(docente);

    return this.http.put(environment.urlApi + '/api/docente/' + id, docente).toPromise()
      .then( () => {
          console.log('ok');
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      );
  }

  deleteDocente(id: any) {
    return this.http.delete(environment.urlApi + '/api/docente/' + id).toPromise()
    .then( () => {
        console.log('ok');
      }
    )
    .catch(
      (err) => {
        console.log(err);
      }
    );
  }
}
