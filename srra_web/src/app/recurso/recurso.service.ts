import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdSnackBar } from '@angular/material';

import { environment } from '../../environments/environment';

@Injectable()
export class RecursoService {

  constructor(private http: HttpClient, private snackbar: MdSnackBar) { }

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
          this.snackbar.open('BATATA', 'Fechar', { duration: 3000 });
        }
      )
      .catch(
        (err) => {
          this.snackbar.open('ERRROUU', 'Fechar', { duration: 3000});
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
