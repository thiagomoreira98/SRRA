import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment';

// import { UiSnackbarComponent } from '../snackbar/snackbar.component';


@Injectable()
export class RecursoService {

  constructor(private http: HttpClient) { }

  getRecursos(): any {
    return this.http.get(environment.urlApi + '/api/recurso');
  }

  getRecursoById(id: any): any {
    return this.http.get(environment.urlApi + '/api/recurso/' + id);
  }

  postRecurso(recurso: any) {
    // console.log(recurso);
    return this.http.post(environment.urlApi + '/api/recurso', recurso).toPromise()
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

  putRecurso(id: any, recurso: any) {
    console.log(id);
    console.log(recurso);

    return this.http.put(environment.urlApi + '/api/recurso/' + id, recurso).toPromise()
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

  deleteRecurso(id: any) {
    return this.http.delete(environment.urlApi + '/api/recurso/' + id).toPromise()
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
