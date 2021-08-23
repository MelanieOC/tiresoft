import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  register(user) {
    return this.http.post(`${this.url}/api/user/register`, user)
  }

  getList() {
    return this.http.get(`${this.url}/api/user/list/data`);
  }

  getUser(user) { 
    return this.http.post(`${this.url}/api/user/edit`, user)
  }

  editDataUser(user) {
    return this.http.post(`${this.url}/api/user/update/data`, user)
  }

  editCredential(user) {
    return this.http.post(`${this.url}/api/user/update/credential`, user)
  }

  deleteUser(user) { //user_id
    return this.http.post(`${this.url}/api/user/delete`, user)
  }

  getImageUrl(url): string {
    return `${this.url}/${url}`
  }
}
