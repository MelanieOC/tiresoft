import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private url: string = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  getList() {
    return this.http.get(`${this.url}/api/clients/list/data`);
  }

  getListPlants(data) {
    return this.http.post(`${this.url}/api/plantas/list/data`, data)
  }

  createPlant(data) {
    return this.http.post(`${this.url}/api/plantas/create`, data)
  }

  deletePlant(data) {
    return this.http.post(`${this.url}/api/plantas/delete`, data)
  }

  getPlant(data) {
    return this.http.post(`${this.url}/api/plantas/edit`, data)
  }

  editPlant(data) {
    return this.http.post(`${this.url}/api/plantas/update`, data)
  }
}
