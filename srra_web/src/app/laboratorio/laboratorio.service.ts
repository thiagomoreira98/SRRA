import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment';

// import { UiSnackbarComponent } from '../snackbar/snackbar.component';


@Injectable()
export class LaboratorioService {

  constructor(private http: HttpClient) { }

  getLaboratorios(): any {
    return this.http.get(environment.urlApi + '/api/laboratorio');
  }

  getLaboratorioById(id: any): any {
    return this.http.get(environment.urlApi + '/api/laboratorio/' + id);
  }

  postLaboratorio(laboratorio: any) {
    // console.log(laboratorio);
    return this.http.post(environment.urlApi + '/api/laboratorio', laboratorio).toPromise()
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

  putLaboratorio(id: any, laboratorio: any) {
    console.log(id);
    console.log(laboratorio);

    return this.http.put(environment.urlApi + '/api/laboratorio/' + id, laboratorio).toPromise()
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

  deleteLaboratorio(id: any) {
    return this.http.delete(environment.urlApi + '/api/laboratorio/' + id).toPromise()
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
