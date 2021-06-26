import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    private url: string = environment.url;
    //public customerSelect = null
    public customerSelect = new BehaviorSubject<any>(null);
    public customerSelect$ = this.customerSelect.asObservable();

    public customers = new BehaviorSubject<any>(null);
    public customers$ = this.customers.asObservable();

    public caps = []
    public reasons = []
    public access = []
    public duales = []
    public divisions = []
    public nuts = []
    public status = []
    public observations = []

    public loadAll: boolean = false


    constructor(
        private http: HttpClient
    ) {
        let customer = JSON.parse(localStorage.getItem('client_tiresoft'))
        if (customer) {
            this.customerSelect.next(customer);
            //this.getData()
        }

    }

    getClientList(id) {
        return this.http.post(`${this.url}/api/list/inicio/cliente`, id)
    }

    getVehicleList(id) {
        return this.http.post(`${this.url}/api/list/formulario/inspecciones`, id)
    }

    getTiresByVehicle(id) {
        return this.http.post(`${this.url}/api/list/formulario/estado/neumaticos`, id)
    }

    getReasons(id) {
        return this.http.post(`${this.url}/api/list/inaccesibilidad/inspecciones`, id)
    }

    getAccessibility() {
        return this.http.get(`${this.url}/api/list/accesibilidad/inspecciones`);
    }

    getTypeCap() {
        return this.http.get(`${this.url}/api/list/tapa/inspecciones`);
    }

    getDuales() {
        return this.http.get(`${this.url}/api/list/duales/inspecciones`);
    }

    getDivision() {
        return this.http.get(`${this.url}/api/list/serparacion/inspecciones`);
    }

    getStatus() {
        return this.http.get(`${this.url}/api/list/estado/inspecciones`);
    }

    getNuts() {
        return this.http.get(`${this.url}/api/list/tuercas/inspecciones`);
    }

    getObservation() {
        return this.http.get(`${this.url}/api/list/observaciones/inspecciones`);
    }

    getTireInfo(data) {
        return this.http.post(`${this.url}/api/list/neumaticos/inspecciones`, data)
    }

    deleteRegister(data) {
        return this.http.post(`${this.url}/api/delete/inspeccion`, data)
    }

    saveRegister(data) {
        return this.http.post(`${this.url}/api/registrar/inspeccion`, data)
    }

    editRegister(data) {
        return this.http.post(`${this.url}/api/editar/inspeccion`, data)
    }

    listInspections(data) {
        return this.http.post(`${this.url}/api/listar/inspeccion`, data)
    }

    listDetailInspections(data) {
        return this.http.post(`${this.url}/api/listar/detalles/inspeccion`, data)
    }

    getInfoDetailInspection(data) {
        return this.http.post(`${this.url}/api/editar/neumatico/inspeccion`, data)
    }

    saveImage(data) {
        return this.http.post(`${this.url}/api/save/imagen/inspeccion`, data)
    }

    getDetail(data) {
        return this.http.post(`${this.url}/api/detalle/neumatico/inspeccion`, data)
    }

    getImageUrl(url): string {
        return `${this.url}/${url}`
    }

    getLogo(base64Image) {
        const body = {
            "requests": [
                {
                    "image": {
                        "content": base64Image
                    },
                    "features": [
                        {
                            "type": "DOCUMENT_TEXT_DETECTION",
                            "maxResults": 1
                        }
                    ]
                }
            ]
        }
        return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBKgWFLtt9w6BQfs2l5FSJ9pp_XWWDsHcw', body);
    }
}
