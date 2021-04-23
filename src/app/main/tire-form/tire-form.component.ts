import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Ng2ImgMaxService } from 'ng2-img-max';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tire-form',
  templateUrl: './tire-form.component.html',
  styleUrls: ['./tire-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TireFormComponent implements OnInit {

  tireForm: FormGroup
  capForm: FormGroup
  rolledForm: FormGroup
  nutsForm: FormGroup

  validNumber: any
  filtered$: Observable<any>

  clientList = new BehaviorSubject<any>([]);
  clientList$ = this.clientList.asObservable();

  caps = []
  duales = []
  observs: any = []

  dial = 'No Aplica'
  status = 0

  observation = new FormControl('')
  photo: any = null
  photoFile: any = null

  photos: {
    resizing$: {
      photoURL: Observable<boolean>,
    },
    data: {
      photoURL: File,
    }
  } = {
      resizing$: {
        photoURL: new BehaviorSubject<boolean>(false),
      },
      data: {
        photoURL: null,
      }
    }

  bankMultiFilterCtrl: FormControl = new FormControl();

  load: boolean = false
  loading: boolean
  //info edit

  codeKm: any = null
  vehicle: any = null

  infoSave: any = null

  constructor(
    private fb: FormBuilder,
    public dbs: DatabaseService,
    private _bottomSheetRef: MatBottomSheetRef<TireFormComponent>,
    private ng2ImgMax: Ng2ImgMaxService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)

    this.getAllData()

    this.tireForm = this.fb.group({
      position: ['', Validators.required],
      serie: ['', Validators.required],
      ejes: ['', Validators.required],
      pressure: [this.data.edit ? this.data.row.presion : '', Validators.required],
      type: ['PSI']
    })

    this.capForm = this.fb.group({
      type: [this.data.edit ? this.data.row.valvula : '', Validators.required],
      accessibility: [this.data.edit ? Number(this.data.row.accesibilidad) : 1, Validators.required],
      reason: [this.data.edit ? this.data.row.motivo_inaccesibilidad : '']

    })

    this.rolledForm = this.fb.group({
      right: [this.data.edit ? Number(this.data.row.r_derecho) : '', Validators.required],
      left: [this.data.edit ? Number(this.data.row.r_izquierdo) : '', Validators.required],
      center: [this.data.edit ? this.data.row.r_medio ? Number(this.data.row.r_medio) : '' : ''],

    })

    this.nutsForm = this.fb.group({
      status: [this.data.edit ? this.data.row.tuercaestado : '', Validators.required],
      amount: [this.data.edit ? this.data.row.tuercacantidad ? Number(this.data.row.tuercacantidad) : '' : '']

    })

    this.getData()

    if (this.data.edit) {
      this.loading = true
      this.observation.setValue(this.data.row.recomendacion)
      let sep = this.data.row.sep_duales.split('-')
      this.dial = sep[sep.length - 1].trim()
      if (this.data.row.imagen_url) {
        this.photo = this.dbs.getImageUrl(this.data.row.imagen_url)
      }
      this.getInfoData()
    } else {
      this.vehicle = this.data.info.vehiculo_id
    }

    this.filtered$ = combineLatest(
      this.bankMultiFilterCtrl.valueChanges.pipe(
        startWith(''),
        map(value => value ? value.toLowerCase() : '')
      ),
      this.clientList$
    ).pipe(
      map(([val, list]) => {
        return list.filter(cl => cl.name.toLowerCase().includes(val))
      })
    )
  }

  getInfoData() {
    let cust = this.dbs.customerSelect.value
    const formData = new FormData();
    formData.append('inspeccion_id', this.data.row.inspeccion_id);
    formData.append('cliente_id', this.data.row.identificador);
    formData.append('identificador', this.data.id);
    formData.append('neumatico_id', this.data.id);
    this.dbs.getInfoDetailInspection(formData).subscribe(resp => {
      this.codeKm = resp['costo_kilometro']['id']
      this.vehicle = resp['costo_kilometro']['id_vehiculo']
      this.loading = false
    })
  }

  getData() {
    let cust = this.dbs.customerSelect.value
    const formData = new FormData();
    formData.append('neumatico_id', this.data.id);
    formData.append('cliente_id', cust.id_cliente);

    this.dbs.getTireInfo(formData).subscribe(res => {

      this.validNumber = res['validate']
      this.rolledForm.get('right').setValidators(Validators.max(Number(res['validate'].v_interior)))
      this.rolledForm.get('left').setValidators(Validators.max(Number(res['validate'].v_exterior)))

      if (res['validate'].v_medio) {
        this.rolledForm.get('center').setValidators(Validators.max(Number(res['validate'].v_medio)))
      }
      this.tireForm.get('position').setValue(res['data'][0]['posicion'])
      this.tireForm.get('serie').setValue(res['data'][0]['num_serie'])
      this.tireForm.get('ejes').setValue(res['data'][0]['id_eje'])
    })
  }

  changeDuales(event, dual) {
    if (dual.name.includes('plica')) {
      if (event) {
        this.duales.forEach(el => {
          if (!el.noChange) {
            el.check = false
          }
        })
      }
    } else {
      if (event) {
        let c = this.duales.find(el => el.name.includes('plica'))
        c.check = false
      }
    }
  }

  readFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.photo = reader.result;
  }

  addNewPhoto(formControlName: string, image: File[]) {
    this.photo = null;
    if (image.length === 0)
      return;
    //this.tempImage = image[0];
    let reader = new FileReader();

    this.photos.resizing$[formControlName].next(true);

    this.ng2ImgMax.resizeImage(image[0], 10000, 426)
      .pipe(
        take(1)
      ).subscribe(
        result => {
          this.photos.data[formControlName] = new File([result], formControlName + result.name.match(/\..*$/));
          this.photoFile = result
          reader.readAsDataURL(image[0]);
          reader.onload = (_event) => {
            this.photo = reader.result;
            this.photos.resizing$[formControlName].next(false);
          }
        },
        error => {
          this.photos.resizing$[formControlName].next(false);
          Swal.fire({
            text: 'Por favor, elija una imagen en formato JPG, o PNG',
            icon: 'info',
            heightAuto: false
          });
          this.photo = null;

        }
      );
  }

  close() {
    this._bottomSheetRef.dismiss();
  }

  save() {
    this.load = true
    let today = new Date()
    let obs1 = this.observs.find(ob => ob.name.toLowerCase().includes('irregular'))
    let obs2 = this.observs.find(ob => ob.name.toLowerCase().includes('reparar'))
    let obs3 = this.observs.find(ob => ob.name.toLowerCase().includes('flanco'))

    let obs = this.observs.filter(ob => ob.check).map(ob => ob.name)
    let duals = this.duales.filter(d => d.check).map(ob => ob.name)

    const formData = new FormData();
    formData.append('identificador', this.data.info.identificador);
    formData.append('codigo', this.data.info.codigo);
    formData.append('vehiculo_id', this.vehicle);
    formData.append('f_inspeccion', this.modifiedDate(this.data.info.f_inspeccion));
    formData.append('km_inspeccion', this.data.info.km_inspeccion);
    formData.append('posicion', this.tireForm.get('position').value);
    formData.append('presion', this.tireForm.get('pressure').value);
    formData.append('presion_tipo', this.tireForm.get('type').value);
    formData.append('estado', this.dbs.status[this.status]);
    formData.append('cocada', '');
    formData.append('valvula', this.capForm.get('type').value);
    formData.append('malogrado', '');
    formData.append('motivo_inaccesibilidad', this.capForm.get('reason').value);
    formData.append('accesibilidad', this.capForm.get('accessibility').value);
    formData.append('r_exterior', this.rolledForm.get('left').value);
    formData.append('r_medio', this.rolledForm.get('center').value ? this.rolledForm.get('center').value : 0);
    formData.append('r_interior', this.rolledForm.get('right').value);
    formData.append('neumatico_id', this.data.id);
    formData.append('resultado', duals.length ? duals.join(',') : '');
    formData.append('otros', obs.length ? obs.join(',') : '');
    formData.append('sep_duales', this.dial);
    formData.append('des_irregular', obs1.check ? obs1.value.join(', ') : '');
    formData.append('para_reparar', obs2.check ? obs2.value : '');
    formData.append('fallas_flanco', obs3.check ? obs3.value : '');
    formData.append('tuerca_estado', this.nutsForm.get('status').value);
    formData.append('tuerca_cantidad', this.nutsForm.get('amount').value);
    formData.append('recomendacion', this.observation.value);

    formData.append('cliente_id', this.dbs.customerSelect.value.id_cliente);

    if (this.data.edit) {
      formData.append('updated_at', this.modifiedDate(today));
      formData.append('inspeccion_id', this.data.row.inspeccion_id);
      formData.append('costo_kilometro_id', this.codeKm);
      formData.append('updated_user_at', this.data.info.crated_user);
      formData.append('imagen_ruta', this.photoFile ? this.photoFile : this.data.row.imagen_url ? this.data.row.imagen_url : '');

      this.dbs.editRegister(formData).subscribe((response: any) => {
        console.log(response)

        let r = response.inspeccion[response.inspeccion.length - 1]
        r['condicion'] = r.nuevo_or_reencauchado == 1 ? 'Nuevo' : 'Reencauchado'
        r['presion'] = r.presion + ' ' + r.tipo_presion
        r['piton'] = this.caps.find(el => el.id == r.valvula).name
        r['costo_kilometro'] = response.costo_kilometro.id

        this.load = false
        this._bottomSheetRef.dismiss({
          inspection: response,
          row: r
        });
      }, error => {
        Swal.fire({
          title: 'Error',
          text: 'Problema al iniciar sesión, usuario o contraseña incorrecto',
          icon: 'error',
          heightAuto: false
        })
      });
    } else {
      formData.append('created_at', this.modifiedDate(today));
      formData.append('crated_user', this.data.info.crated_user);
      formData.append('planta_id', this.data.info.planta_id);
      formData.append('repuesto', this.data.info.repuesto);
      formData.append('portallantas', this.data.info.portallantas);
      formData.append('img_neumatico', this.photoFile ? this.photoFile : '');

      this.dbs.saveRegister(formData).subscribe((response: any) => {
        this.load = false
        let r = response.inspeccion[response.inspeccion.length - 1]
        r['condicion'] = r.nuevo_or_reencauchado == 1 ? 'Nuevo' : 'Reencauchado'
        r['presionS'] = r.presion + ' ' + r.tipo_presion
        r['piton'] = this.caps.find(el => el.id == r.valvula).name
        r['costo_kilometro'] = response.costo_kilometro.id
        r['inspeccion_id'] = r.id
        r['imagen_url'] = r.neumaticoimgruta1

        this._bottomSheetRef.dismiss({
          inspection: response,
          row: r
        });
      }, error => {
        Swal.fire({
          title: 'Error',
          text: 'Problema al iniciar sesión, usuario o contraseña incorrecto',
          icon: 'error',
          heightAuto: false
        })
      });
    }
  }

  modifiedDate(data) {
    return `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`
  }

  onKeydown(event) {
    let permit =
      event.keyCode === 8 ||
      event.keyCode === 46 ||
      event.keyCode === 37 ||
      event.keyCode === 39;
    return permit ? true : !isNaN(Number(event.key));
  }

  getAllData() {
    let dualSelec = []
    let obserSelect = []
    if (this.data.edit) {
      this.status = this.dbs.status.findIndex(st => st == this.data.row.estado)

      dualSelec = this.data.row.d_hermanados.split(',').map(el => el.trim())
      obserSelect = this.data.row.observaciones ? this.data.row.observaciones.split(',').map(el => el.trim()) : []
    }

    this.caps = this.dbs.caps
    this.duales = [...this.dbs.duales].map(dt => {
      dt.noChange = dt.name.includes('plica')
      dt.check = this.data.edit ? dualSelec.includes(dt.name) : dt.name.includes('plica')
      dt.color = dt.name.includes('plica') ? 'warn' : 'primary'
      return dt
    })
    this.observs = [...this.dbs.observations].map(ob => {
      ob.check = this.data.edit ? obserSelect.includes(ob.name) : false
      if (this.data.edit) {
        if (ob.name.toLowerCase().includes('irregular')) {
          ob.value = this.data.row.desgirregular ? this.data.row.desgirregular.split(',').map(ir => Number(ir)) : null
        }
        if (ob.name.toLowerCase().includes('reparar')) {
          ob.value = this.data.row.parareparar
        }
        if (ob.name.toLowerCase().includes('flanco')) {
          ob.value = this.data.row.fallasflanco
        }
      }
      return ob
    })

    this.clientList.next(this.observs.filter(el => !el.multi)[0].options)

  }
}
