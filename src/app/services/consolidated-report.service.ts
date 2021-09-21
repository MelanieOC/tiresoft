import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsolidatedReportService {
  private url: string = environment.url;

  constructor(private http: HttpClient) { }

  getMeasuresDistribution(data) { //2
    return this.http.post(`${this.url}/api/consolidado/distribucion/medidas`, data)
  }

  getBrandPosition(data) {//3
    return this.http.post(`${this.url}/api/consolidado/posicion/marca`, data)
  }

  getBrandEjeD(data) {//4
    return this.http.post(`${this.url}/api/consolidado/marca/eje/direccional`, data)
  }

  getBrandEjeT(data) {//5
    return this.http.post(`${this.url}/api/consolidado/marca/eje/traccion`, data)
  }

  getBrandEjeA(data) {//6
    return this.http.post(`${this.url}/api/consolidado/marca/eje/apoyo`, data)
  }

  getInspectedEquipment(data) {//1
    return this.http.post(`${this.url}/api/consolidado/equipos/inspeccionados`, data)
  }

  getTireI(data) {//12
    return this.http.post(`${this.url}/api/consolidado/inflado/neumatico`, data)
  }

  getTireIPreasure(data) {//13
    return this.http.post(`${this.url}/api/consolidado/presion/inflado`, data)
  }

  getRetreadIndex(data) {//15
    return this.http.post(`${this.url}/api/consolidado/indice/reencauche`, data)
  }

  getRetreadabilityIndex(data) {//16
    return this.http.post(`${this.url}/api/consolidado/indice/reencauchabilidad`, data)
  }

  getRemainingLevels(data) {//9
    return this.http.post(`${this.url}/api/consolidado/niveles/remanente/unidad`, data)
  }

  getRetreadService(data) {//10
    return this.http.post(`${this.url}/api/consolidado/servicio/reencauche`, data)
  }

  getWearIrregular(data) {//11
    return this.http.post(`${this.url}/api/consolidado/desgaste/irregular`, data)
  }

  getRemaindLevelMeasure(data) {//14
    return this.http.post(`${this.url}/api/consolidado/nivel/remanente/medida`, data)
  }

  getInspections(data) {//17
    return this.http.post(`${this.url}/api/consolidado/reporte/inspecciones`, data)
  }

  getRemoveTires(data) {//8
    return this.http.post(`${this.url}/api/consolidado/neumaticos/retiro`, data)
  }

  getBadTires(data) {//7
    return this.http.post(`${this.url}/api/consolidado/neumaticos/mal/estado`, data)
  }

  getCost(data) {//18
    return this.http.post(`${this.url}/api/consolidado/costo/kilometro`, data)
  }
}
