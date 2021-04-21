import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith, take, tap } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output() onVehicle = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<any>();

  inspectForm: FormGroup

  filtered$: Observable<any>

  clientList = new BehaviorSubject<any>([]);
  clientList$ = this.clientList.asObservable();

  dateValidate: any = "2017-11-28"
  kmValidate: any = 0

  select = null
  plants = []

  vehicle$: Observable<any>
  vehicle = null

  constructor(
    private fb: FormBuilder,
    private dbs: DatabaseService
  ) { }

  ngOnInit(): void {
    this.select = this.dbs.customerSelect.value
    this.inspectForm = this.fb.group({
      code: [''],
      customer: [this.select ? this.select.razon_social : null],
      ruc: [this.select ? this.select.ruc : null],
      tow: [null, Validators.required],
      filter: [null],
      date: [[null], [Validators.required, this.dateValidator()]],
      mileage: [[null], [Validators.required, Validators.min(0)]],
      plant: [''],
      tire_carrier: [false],
      spare_tire: [false]
    })

    this.inspectForm.get('tow').disable()
    this.inspectForm.get('date').disable()
    this.inspectForm.get('mileage').disable()

    if (this.select) {
      const formC = new FormData()
      formC.append('id_cliente', this.select.id_cliente);
      this.dbs.getVehicleList(formC).subscribe(resp => {
        this.clientList.next(resp['vehiculos'])
        this.plants = resp['planta']
        this.inspectForm.get('tow').enable()
      })

    }
    this.filtered$ = combineLatest(
      this.inspectForm.get('filter').valueChanges.pipe(
        startWith(''),
        map(value => value ? value.toLowerCase() : '')
      ),
      this.clientList$
    ).pipe(
      map(([val, list]) => {
        return list.filter(cl => cl.placa.toLowerCase().includes(val))
      })
    )

    this.vehicle$ = this.inspectForm.get('tow').valueChanges.pipe(
      tap(vh => {
        if (vh) {
          const formV = new FormData()
          formV.append('id_vehiculo', vh);
          this.dbs.getTiresByVehicle(formV).subscribe(resp => {
            console.log(resp)
            let arr = this.clientList.value
            let sl = arr.find(v => v.id_vehiculo == vh)
            //this.selectVehicle = `${sl.placa} | ${sl.codigo}`
            this.vehicle = resp['validate'][0]
            this.dateValidate = this.vehicle.fecha
            this.kmValidate = Number(this.vehicle.kilometraje)
            this.inspectForm.get('date').reset()
            this.inspectForm.get('mileage').reset()

            this.inspectForm.get('date').enable()
            this.inspectForm.get('mileage').enable()

            let send = {
              vehicle:sl,
              neumaticos:resp['neumaticos']
            }
            this.onVehicle.emit(send)

            if (this.vehicle != 'Nuevo') {
              this.inspectForm.get('mileage').setValidators(Validators.min(this.vehicle.kilometraje))
            }

          })
        }
      })
    )
  }

  getvalidateDate(stringDate) {
    let arr = stringDate.split('-')
    let date = new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]))

    return date
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value instanceof Date) {
        let valid = this.vehicle ? control.value.getTime() < this.getvalidateDate(this.dateValidate).getTime() : false
        if (valid) {
          return { 'validateDate': { value: control.value } }
        } else {
          return null
        }

      }
      return null
    }
  }

  save(){
    this.onSave.emit(this.inspectForm.value)
  }

}
