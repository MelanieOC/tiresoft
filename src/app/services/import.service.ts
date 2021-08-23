import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  private url: string = environment.url;

  constructor(private http: HttpClient) { }

  importTires(data) {
    return this.http.post(`${this.url}/api/import/data/neumaticos`, data)
  }

  verifiedTires(data){
    return this.http.post(`${this.url}/api/import/validate/neumaticos`, data)
  }

  importVehicles(data) {
    return this.http.post(`${this.url}/api/import/data/vehiculos`, data)
  }

  verifiedVehicles(data){
    return this.http.post(`${this.url}/api/import/validate/vehiculos`, data)
  }
}
