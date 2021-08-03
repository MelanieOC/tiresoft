import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url: string = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  getRoles(){
    return this.http.get(`${this.url}/api/roles/data`);
  }

  getPermission(){
    return this.http.get(`${this.url}/api/permissions/data`);
  }

  getRol(id){
    return this.http.get(`${this.url}/api/roles/id/${id}`);
  }

  addPermission(data) {
    return this.http.post(`${this.url}/api/roles/add/permission`, data)
  }

  deletePermission(data) {
    return this.http.post(`${this.url}/api/roles/delete/permission`, data)
  }

  createRol(data) {
    return this.http.post(`${this.url}/api/roles/add/role`, data)
  }

  deleteRol(data) {
    return this.http.post(`${this.url}/api/roles/delete/role`, data)
  }
}
