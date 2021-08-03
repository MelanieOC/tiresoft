import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, combineLatest } from 'rxjs';

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
        return this.http.post(`${this.url}/api/inicio/clients`, id)
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

    getRateSunat(){
        return this.http.get(`https://newserver.pruebasgt.com/api/tipoDeCambio`);
    }
}
