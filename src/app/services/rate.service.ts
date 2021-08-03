import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private url: string = environment.url;

  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get(`${this.url}/api/tipo/cambio/data`);
  }

  createRate(user) { //user_id
    return this.http.post(`${this.url}/api/tipo/cambio/create`, user)
  }

}
