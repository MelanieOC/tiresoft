import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, take, tap } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TireFormComponent } from '../../tire-form/tire-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatStepper } from '@angular/material/stepper';
import { combineLatest, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DetailTireComponent } from '../detail-tire/detail-tire.component';

@Component({
  selector: 'app-inspection-form',
  templateUrl: './inspection-form.component.html',
  styleUrls: ['./inspection-form.component.scss']
})
export class InspectionFormComponent implements OnInit {

  inspectForm: FormGroup

  @ViewChild('stepper') private myStepper: MatStepper;

  view = 1

  select = null
  selectVehicle = null

  infoSave: boolean = false
  info: any = null

  identificador: number = 0

  ubication = [
    [{ id: -1 }, { id: 1, value: null, name: null, id_neumatico: null }, { id: -2 }, { id: 2, value: null, name: null, id_neumatico: null }, { id: -1 }],
    [{ id: 5, value: null, name: null, id_neumatico: null }, { id: 3, value: null, name: null, id_neumatico: null }, { id: -2 }, { id: 4, value: null, name: null, id_neumatico: null }, { id: 6, value: null, name: null, id_neumatico: null }],
    [{ id: 9, value: null, name: null, id_neumatico: null }, { id: 7, value: null, name: null, id_neumatico: null }, { id: -2 }, { id: 8, value: null, name: null, id_neumatico: null }, { id: 10, value: null, name: null, id_neumatico: null }],
    [{ id: 13, value: null, name: null, id_neumatico: null }, { id: 11, value: null, name: null, id_neumatico: null }, { id: -2 }, { id: 12, value: null, name: null, id_neumatico: null }, { id: 14, value: null, name: null, id_neumatico: null }],
    [{ id: 17, value: null, name: null, id_neumatico: null }, { id: 15, value: null, name: null, id_neumatico: null }, { id: -2 }, { id: 16, value: null, name: null, id_neumatico: null }, { id: 18, value: null, name: null, id_neumatico: null }],
    [{ id: 21, value: null, name: null, id_neumatico: null }, { id: 19, value: null, name: null, id_neumatico: null }, { id: -2 }, { id: 20, value: null, name: null, id_neumatico: null }, { id: 22, value: null, name: null, id_neumatico: null }]
  ]

  example = {
    id: 5, value: null, name: null, id_neumatico: 130
  }
  rowsUbication = [false, false, false, false, false, false]

  dateValidate: any = "2017-11-28"
  kmValidate: any = 0

  id: number = null
  routeChange$: Observable<any>

  constructor(
    private fb: FormBuilder,
    private dbs: DatabaseService,
    private auth: AuthService,
    private _bottomSheet: MatBottomSheet,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.routeChange$ = this.activatedRoute.params.pipe(
      tap(event => {
        this.id = event ? event.id : null
      })
    )

    this.select = this.dbs.customerSelect.value
    this.inspectForm = this.fb.group({
      code: [''],
      customer: [this.select ? this.select.razon_social : null],
      ruc: [this.select ? this.select.ruc : null],
      tow: [null, Validators.required],
      filter: [null],
      date: [[null], [Validators.required]],
      mileage: [[null], [Validators.required, Validators.min(0)]],
      plant: [''],
      tire_carrier: [false],
      spare_tire: [false]
    })

    //this.getData()
  }


  getVehicleInfo(res) {
    let sl = res.vehicle
    this.selectVehicle = `${sl.placa} | ${sl.codigo}`
    this.modifiedData(res['neumaticos'])
  }

  getInfoData(res) {
    this.inspectForm.setValue(res)
    this.myStepper.next();
  }

  modifiedData(data) {
    this.identificador = 0
    this.ubication.forEach((ub, i) => {
      ub.forEach((slot, k) => {
        let tire = data.find(d => d.ubicacion == slot.id)
        if (tire) {
          this.ubication[i][k].id_neumatico = tire.id_neumaticos
          this.ubication[i][k].name = 'P' + tire.posicion
        } else {
          this.ubication[i][k].id_neumatico = null
          this.ubication[i][k].name = null
        }
      })
    })

    this.rowsUbication = this.ubication.map(ub => ub.reduce((a, b) => a || !!b.id_neumatico, false))

  }

  openBottom(slot) {
    let dat = this.inspectForm.value
    this.info = {
      identificador: this.identificador,
      codigo: dat.code,
      vehiculo_id: dat.tow,
      f_inspeccion: dat.date,
      km_inspeccion: dat.mileage,
      planta_id: dat.plant,
      repuesto: dat.spare_tire ? 1 : 0,
      portallantas: dat.tire_carrier ? 1 : 0,
      crated_user: this.auth.user.value.id
    }

    if (slot.id_neumatico) {
      this.dialog.open(DetailTireComponent, {
        data: {
          id: slot.id_neumatico,
          info: this.info,
          row: slot,
          edit: slot.value ? true : false
        },
        width: '600px',
        disableClose: true,
        autoFocus: false
      }).afterClosed().subscribe(res => {
        console.log(res)
        if (res) {
          this._bottomSheet.open(TireFormComponent, {
            data: {
              id: slot.id_neumatico,
              info: this.info,
              row: slot.value,
              edit: slot.value ? true : false
            }
          }).afterDismissed().pipe(take(1)).subscribe(res => {
            if (res) {
              if (res.inspection) {
                this.identificador = res.inspection.identificador
              }
              if (res.row) {
                slot.value = res.row
                let r = res.row
              }
            }
          })
        }
      })
    }
  }

  deleteRow(event) {
    Swal.fire({
      title: '¿Está seguro que desea borrar el siguiente registro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      heightAuto: false
    }).then((result) => {
      if (result.value) {
        const formC = new FormData()
        formC.append('inspeccion_id', event.id);
        formC.append('neumatico_id', event.id_neumatico);

        this.dbs.deleteRegister(formC).subscribe(resp => {
          event.value = null
        }, error => {
          Swal.fire({
            title: 'Error',
            text: error.error.message,
            icon: 'error',
            heightAuto: false
          })
        });
      }
    })

  }

  viewChange(num) {
    this.view = num
  }

  finishAll() {
    const allSlots = [...this.ubication].map(ub => {
      return ub.filter(sl => !!sl.name).filter(sl => !sl.value).length
    }).reduce((a, b) => a + b, 0)
    if (allSlots > 0) {
      Swal.fire({
        title: '¿Está seguro que desea finalizar la inspección?',
        text: 'Existen neumáticos sin inspeccionar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar',
        heightAuto: false
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['main/inspecciones'])
        } else {
          return;
        }
      });
    } else {
      this.router.navigate(['main/inspecciones'])
    }

    //this.router.navigate(['main/inspecciones'])
  }

}
