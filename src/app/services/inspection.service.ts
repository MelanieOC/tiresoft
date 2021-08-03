import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  private url: string = environment.url;

  public caps = []
  public reasons = []
  public access = []
  public duales = []
  public divisions = []
  public nuts = []
  public status = []
  public observations = []

  constructor(
    private http: HttpClient,
    private zone: NgZone
  ) {
    this.zone.run(() => {
      this.getAllData()
    });
  }

  getVehicleList(id) {
    return this.http.post(`${this.url}/api/inspeccion/data/validate`, id)
  }

  getTiresByVehicle(id) {
    return this.http.post(`${this.url}/api/inspeccion/data/neumaticos`, id)
  }

  getTireInfo(data) {
    return this.http.post(`${this.url}/api/inspeccion/data/remanente`, data)
  }

  deleteRegister(data) {
    return this.http.post(`${this.url}/api/inspeccion/delete`, data)
  }

  saveRegister(data) {
    return this.http.post(`${this.url}/api/inspeccion/add`, data)
  }

  editRegister(data) {
    return this.http.post(`${this.url}/api/inspeccion/edit`, data)
  }

  listInspections(data) {
    return this.http.post(`${this.url}/api/inspeccion/list`, data)
  }

  listDetailInspections(data) {
    return this.http.post(`${this.url}/api/inspeccion/list/detalle`, data)
  }

  getInfoDetailInspection(data) {
    return this.http.post(`${this.url}/api/inspeccion/data/editar`, data)
  }

  getDetail(data) {
    return this.http.post(`${this.url}/api/inspeccion/detalle/neumatico`, data)
  }

  getImageUrl(url): string {
    return `${this.url}/${url}`
  }

  getReasons(id) {
    return this.http.post(`${this.url}/api/inspeccion/data/inaccesibilidad`, id)
  }

  getAccessibility() {
    return this.http.get(`${this.url}/api/inspeccion/data/accesibilidad`);
  }

  getTypeCap() {
    return this.http.get(`${this.url}/api/inspeccion/data/tapa`);
  }

  getDuales() {
    return this.http.get(`${this.url}/api/inspeccion/data/duales`);
  }

  getDivision() {
    return this.http.get(`${this.url}/api/inspeccion/data/serparacion/duales`);
  }

  getStatus() {
    return this.http.get(`${this.url}/api/inspeccion/data/estado`);
  }

  getNuts() {
    return this.http.get(`${this.url}/api/inspeccion/data/tuercas`);
  }

  getObservation() {
    return this.http.get(`${this.url}/api/inspeccion/data/observaciones`);
  }

  getAllData() {
    const formR = new FormData();
    formR.append('id_accesibilidad', '0');
    let allData = combineLatest(
      this.getNuts().pipe(
        map(res => {
          let caps = res['tuercas']
          return Object.values(caps)
        })
      ),
      this.getObservation().pipe(
        map(res => {
          let caps = res['observaciones']
          let arr = []
          Object.keys(caps).forEach(k => {
            let ops = []
            if (caps[k]) {
              ops = Object.values(caps[k]).map((p, k) => {
                return {
                  name: p,
                  value: k + 1
                }
              })
            }
            arr.push({
              name: k,
              options: ops,
              multi: !k.includes('rregular'),
              check: false,
              value: ''
            })
          })
          return arr
        })
      ),
      this.getReasons(formR).pipe(
        map(res => {
          return res['inaccesibilidad']
        })
      ),
      this.getTypeCap().pipe(
        map(res => {
          let caps = res['tipo_tapa']
          let arr = []
          Object.keys(caps).forEach(k => {
            arr.push({
              id: k,
              name: caps[k]
            })
          })
          return arr
        })
      ),
      this.getDuales().pipe(
        map(res => {
          let caps = res['duales']
          let arr = []
          Object.keys(caps).forEach(k => {
            arr.push({
              id: k,
              name: caps[k],
              check: false
            })
          })
          return arr
        })
      ),
      this.getAccessibility().pipe(
        map(res => {
          let caps = res['accesibilidad']
          let arr = []
          Object.keys(caps).forEach(k => {
            arr.push({
              id: k,
              name: caps[k]
            })
          })
          return arr
        })
      ),
      this.getDivision().pipe(
        map(res => {
          let caps = res['separacion']
          return Object.values(caps)
        })
      ),
      this.getStatus().pipe(
        map(res => {
          let caps = res['estado']
          return Object.values(caps)
        })
      )
    )

    allData.subscribe(res => {
      this.nuts = res[0]
      this.observations = res[1]
      this.reasons = res[2]
      this.caps = res[3]
      this.duales = res[4]
      this.access = res[5]
      this.divisions = res[6]
      this.status = res[7]
    })
  }
}
