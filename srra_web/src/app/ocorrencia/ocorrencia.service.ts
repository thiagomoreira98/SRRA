import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment';

@Injectable()
export class OcorrenciaService {

  constructor(private http: HttpClient) { }
  
    getOcorrencias(): any {
      return this.http.get(environment.urlApi + '/api/ocorrencia');
    }
  
    getOcorrenciaById(id: any): any {
      return this.http.get(environment.urlApi + '/api/ocorrencia/' + id);
    }
  
    postOcorrencia(ocorrencia: any) {
      // console.log(laboratorio);
      return this.http.post(environment.urlApi + '/api/ocorrencia', ocorrencia).toPromise()
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
  
    putOcorrencia(id: any, ocorrencia: any) {
      console.log(id);
      console.log(ocorrencia);
  
      return this.http.put(environment.urlApi + '/api/ocorrencia/' + id, ocorrencia).toPromise()
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
  
    deleteOcorrencia(id: any) {
      return this.http.delete(environment.urlApi + '/api/ocorrencia/' + id).toPromise()
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
