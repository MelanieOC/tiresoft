import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AplicationService {
  private url: string = environment.url;

  constructor(private http: HttpClient) { }

  getList(data) { //cliente_id
    return this.http.post(`${this.url}/api/aplicacion/list/data`, data)
  }

  create(data) {
    return this.http.post(`${this.url}/api/aplicacion/create`, data)
  }

  delete(data) {
    return this.http.post(`${this.url}/api/aplicacion/delete`, data)
  }

  getApp(data) {
    return this.http.post(`${this.url}/api/aplicacion/edit`, data)
  }

  edit(data) {
    return this.http.post(`${this.url}/api/aplicacion/update`, data)
  }

}
