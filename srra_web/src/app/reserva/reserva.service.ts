import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class ReservaService {

  constructor(private http: HttpClient) { }

  selecionar(filtro) {
    let params = new HttpParams();

    for (let property in filtro) {
      params = params.append(property, filtro[property]);
    }

    return this.http.get(`${environment.urlApi}/api/reserva`);
  }

  buscar(id: any) {
    return this.http.get(`${environment.urlApi}/api/reserva/${id}`);
  }

  inserir(reserva: any) {
    return this.http.post(`${environment.urlApi}/api/reserva`, reserva).toPromise();
  }

  alterar(id: any, reserva: any) {
    return this.http.put(`${environment.urlApi}/api/reserva/${id}`, reserva).toPromise();
  }

  deletar(id: any) {
    return this.http.delete(`${environment.urlApi}/api/reserva/${id}`).toPromise();
  }
}
