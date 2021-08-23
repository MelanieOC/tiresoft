import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImportService } from 'src/app/services/import.service';

@Component({
  selector: 'app-import-vehicles',
  templateUrl: './import-vehicles.component.html',
  styleUrls: ['./import-vehicles.component.scss']
})
export class ImportVehiclesComponent implements OnInit {

  columns = [
    { name: 'placa', slug: 'placa', type: 'string', stick: true },
    { name: 'codigo', slug: 'codigo', type: 'string', stick: true },
    { name: 'aplicación', slug: 'aplicacion', type: 'string', stick: true },
    { name: 'tipo de costo', slug: 'tipo_costo', type: 'string', stick: true },
    { name: 'fecha de fabricacion', slug: 'fecha_fabricacion', type: 'string', stick: false },
    { name: 'marca', slug: 'marca', type: 'string', stick: true },
    { name: 'modelo', slug: 'modelo', type: 'string', stick: true },
    { name: 'configuracion del vehiculo', slug: 'configuracion_vehiculo', type: 'string', stick: true },
    { name: 'punto de apoyo', slug: 'punto_apoyo', type: 'number', stick: true },
    { name: 'punto de traccion', slug: 'punto_traccion', type: 'number', stick: true },
    { name: 'numero de neumaticos', slug: 'numero_neumaticos', type: 'number', stick: true },
    { name: 'tipo de configuracion', slug: 'tipo_configuracion', type: 'string', stick: true },
    { name: 'tipo de vehiculo', slug: 'tipo_vehiculo', type: 'string', stick: true },
    { name: 'neumaticos delanteros', slug: 'neumaticos_delanteros', type: 'number', stick: true },
    { name: 'neumaticos posteriores', slug: 'neumaticos_posteriores', type: 'number', stick: true },
    { name: 'descripcion', slug: 'descripcion', type: 'string', stick: false },
    { name: 'posicion inicial', slug: 'posicion_inicial', type: 'string', stick: false },
    { name: 'a', slug: 'a', type: 'string', stick: false, position: 1 },
    { name: 'b', slug: 'b', type: 'string', stick: false, position: 2 },
    { name: 'c', slug: 'c', type: 'string', stick: false, position: 3 },
    { name: 'd', slug: 'd', type: 'string', stick: false, position: 4 },
    { name: 'e', slug: 'e', type: 'string', stick: false, position: 5 },
    { name: 'f', slug: 'f', type: 'string', stick: false, position: 6 },
    { name: 'g', slug: 'g', type: 'string', stick: false, position: 7 },
    { name: 'h', slug: 'h', type: 'string', stick: false, position: 8 },
    { name: 'i', slug: 'i', type: 'string', stick: false, position: 9 },
    { name: 'j', slug: 'j', type: 'string', stick: false, position: 10 },
    { name: 'k', slug: 'k', type: 'string', stick: false, position: 11 },
    { name: 'l', slug: 'l', type: 'string', stick: false, position: 12 },
    { name: 'm', slug: 'm', type: 'string', stick: false, position: 13 },
    { name: 'n', slug: 'n', type: 'string', stick: false, position: 14 },
    { name: 'o', slug: 'o', type: 'string', stick: false, position: 15 },
    { name: 'p', slug: 'p', type: 'string', stick: false, position: 16 },
    { name: 'q', slug: 'q', type: 'string', stick: false, position: 17 },
    { name: 'r', slug: 'r', type: 'string', stick: false, position: 18 },
    { name: 's', slug: 's', type: 'string', stick: false, position: 19 },
    { name: 't', slug: 't', type: 'string', stick: false, position: 20 },
    { name: 'u', slug: 'u', type: 'string', stick: false, position: 21 },
    { name: 'v', slug: 'v', type: 'string', stick: false, position: 22 }
  ]

  allData = []
  series = []
  errorList = []
  observs: number = 0
  reboot = false
  buttonSubmit: boolean = false

  constructor(
    private excel: ExcelService,
    private dbs: DatabaseService,
    private importService: ImportService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event): void {
    if (event.length) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        let selected = XLSX.utils.sheet_to_json(ws, { header: "A", defval: "" });
        this.upLoadXls(selected)
      };
      reader.readAsBinaryString(event[0]);
    }
  }

  upLoadXls(array): void {
    this.series = []
    const positions = this.columns.filter(cl => cl.position)

    let info = array.map(el => Object.values(el))
    const headers = info[0].map(el => el.replace(/ /g, ""))
      .filter(hd => this.columns.find(cl => cl.name.replace(/ /g, "") == hd))

    if (headers.length == this.columns.length) {
      this.allData = info.slice(1).map(el => {
        let obj: object = {}
        this.columns.forEach((cl, ind) => {
          if (cl.slug == 'placa') {
            this.series.push(el[ind])
          }
          if (cl.type == 'number' && cl.stick) {
            if (el[ind]) {
              const num = typeof el[ind] == 'number' ? el[ind] : Number(el[ind])
              obj[cl.slug] = num
            } else {
              obj[cl.slug] = 0
            }
          } else {
            obj[cl.slug] = el[ind]
          }

        })

        return obj
      })

      let verified = this.allData.map(dt => {
        let errors = []
        this.columns.forEach(cl => {
          if (cl.stick && !dt[cl.slug] && cl.type == 'string') {
            errors.push('Dato faltante ' + cl.name)
          }
        })

        const repite = this.series.filter(sr => sr == dt['placa'])
        if (repite.length > 1) {
          errors.push('placa repetida')
        }

        let positionInit = dt['posicion_inicial'] ? Number(dt['posicion_inicial'].replace('P', '')) : 1

        positions.forEach(pt => {
          if (pt.position < positionInit) {
            if (dt[pt.slug]) {
              errors.push('no coincide la posicion inicial')
            }
          }

        })
        return {
          error: errors.length > 0,
          placa: dt['placa'],
          list: errors
        }
      })
      this.errorList = verified
      this.observs = verified.filter(vr => vr.error).length
      this.verified()
    } else {
      Swal.fire({
        title: 'Error',
        text: 'El archivo no contiene las columnas requeridas',
        icon: 'error',
        heightAuto: false
      })
    }

  }

  send() {
    this.buttonSubmit = true
    const send = {
      user_id: this.auth.user.value.id,
      cliente_id: this.dbs.customerSelect.value.id_cliente,
      excel_vehiculos: this.allData
    }
    this.importService.importVehicles(send).subscribe(res => {
      Swal.fire({
        //title: 'Guardado',
        text: res['message'],
        icon: 'success',
        heightAuto: false
      })
      this.buttonSubmit = false
      this.restart()
    })
  }

  verified() {
    const send = {
      user_id: this.auth.user.value.id,
      cliente_id: this.dbs.customerSelect.value.id_cliente,
      excel_vehiculos: this.allData
    }
    this.importService.verifiedVehicles(send).subscribe(res => {
      if (res['total_placas_repetidas'] > 0) {
        this.errorList = this.errorList.map(er => {
          const find = res['placas_repetidas'].find(sr => sr.placa == er.placa)
          if (find) {
            er.error = true
            er.list.push(find.message)
          }
          return er
        })
        this.observs = this.errorList.filter(vr => vr.error).length
      }
      if (res['total_neumaticos_inexactos'].length > 0) {
        this.errorList = this.errorList.map(er => {
          const find = res['total_neumaticos_inexactos'].find(sr => sr.placa == er.placa)
          if (find) {
            er.error = true
            er.list.push(find.message)
          }
          return er
        })
        this.observs = this.errorList.filter(vr => vr.error).length
      }
    })
  }

  restart() {
    this.errorList = []
    this.allData = []
    this.reboot = true
  }

  downloadXls(): void {
    let table_xlsx: any[] = [
      [
        "C-36",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "ROYAL PROSERVIS",
        "RMB",
        "6x0/6/A",
        6,
        0,
        6,
        "A",
        "CISTERNA",
        0,
        6,
        "EQUIPO",
        "P7",
        "",
        "",
        "",
        "",
        "",
        "",
        "P7/Eje libre",
        "P8/Eje libre",
        "P9/Eje libre",
        "P10/Eje libre",
        "",
        "P11/Eje libre",
        "P12/Eje libre",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "P-216",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "ROYAL PROSERVIS",
        "RMB",
        "4x0/8/D",
        4,
        0,
        8,
        "D",
        "CARRETA",
        0,
        8,
        "EQUIPO",
        "P7",
        "",
        "",
        "",
        "",
        "",
        "",
        "P7/Eje libre",
        "P8/Eje libre",
        "P9/Eje libre",
        "P10/Eje libre",
        "P11/Eje libre",
        "P12/Eje libre",
        "P13/Eje libre",
        "P14/Eje libre",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "P-282",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "ROYAL PROSERVIS",
        "RMB",
        "6x0/6/A",
        6,
        0,
        6,
        "A",
        "CARRETA",
        0,
        6,
        "EQUIPO",
        "P7",
        "",
        "",
        "",
        "",
        "",
        "",
        "P7/Eje libre",
        "P8/Eje libre",
        "P9/Eje libre",
        "P10/Eje libre",
        "",
        "P11/Eje libre",
        "P12/Eje libre",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "P-452",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "ROYAL PROSERVIS",
        "RMB",
        "6x0/6/A",
        6,
        0,
        6,
        "A",
        "CARRETA",
        0,
        6,
        "EQUIPO",
        "P7",
        "",
        "",
        "",
        "",
        "",
        "",
        "P7/Eje libre",
        "P8/Eje libre",
        "P9/Eje libre",
        "P10/Eje libre",
        "",
        "P11/Eje libre",
        "P12/Eje libre",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "P-67",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "ROYAL PROSERVIS",
        "RMB",
        "6x0/12/B",
        6,
        0,
        12,
        "B",
        "CARRETA",
        0,
        12,
        "EQUIPO",
        "P7",
        "",
        "",
        "",
        "",
        "",
        "",
        "P7/Eje libre",
        "P8/Eje libre",
        "P9/Eje libre",
        "P10/Eje libre",
        "P11/Eje libre",
        "P12/Eje libre",
        "P13/Eje libre",
        "P14/Eje libre",
        "P15/Eje libre",
        "P16/Eje libre",
        "P17/Eje libre",
        "P18/Eje libre",
        "",
        "",
        "",
        ""
      ],
      [
        "R-121",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "INTERNATIONAL",
        7600,
        "6x4/10/A",
        6,
        4,
        10,
        "A",
        "CAMION FURGON",
        2,
        8,
        "EQUIPO",
        "P1",
        "P1/Direccional",
        "P2/Direccional",
        "P3/Traccion",
        "P4/Traccion",
        "P5/Traccion",
        "P6/Traccion",
        "P7/Traccion",
        "P8/Traccion",
        "P9/Traccion",
        "P10/Traccion",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "R-161",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "VOLVO",
        "FH12",
        "4x2/6/A",
        4,
        2,
        6,
        "A",
        "CAMION CISTERNA",
        2,
        4,
        "EQUIPO",
        "P1",
        "P1/Direccional",
        "P2/Direccional",
        "P3/Traccion",
        "P4/Traccion",
        "P5/Traccion",
        "P6/Traccion",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "R-182",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "INTERNATIONAL",
        9200,
        "6x4/10/A",
        6,
        4,
        10,
        "A",
        "CAMION FURGON",
        2,
        8,
        "EQUIPO",
        "P1",
        "P1/Direccional",
        "P2/Direccional",
        "P3/Traccion",
        "P4/Traccion",
        "P5/Traccion",
        "P6/Traccion",
        "P7/Traccion",
        "P8/Traccion",
        "P9/Traccion",
        "P10/Traccion",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "R-200",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "INTERNATIONAL",
        9200,
        "6x4/10/A",
        6,
        4,
        10,
        "A",
        "TRACTO",
        2,
        8,
        "EQUIPO",
        "P1",
        "P1/Direccional",
        "P2/Direccional",
        "P3/Traccion",
        "P4/Traccion",
        "P5/Traccion",
        "P6/Traccion",
        "P7/Traccion",
        "P8/Traccion",
        "P9/Traccion",
        "P10/Traccion",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "R-298",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "INTERNATIONAL",
        7600,
        "6x4/6/C",
        6,
        4,
        6,
        "C",
        "TRACTO",
        2,
        4,
        "EQUIPO",
        "P1",
        "P1/Direccional",
        "P2/Direccional",
        "P3/Traccion",
        "P4/Traccion",
        "P5/Traccion",
        "P6/Traccion",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "R-314",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "INTERNATIONAL",
        7600,
        "6x4/6/C",
        6,
        4,
        6,
        "C",
        "TRACTO",
        2,
        4,
        "EQUIPO",
        "P1",
        "P1/Direccional",
        "P2/Direccional",
        "P3/Traccion",
        "P4/Traccion",
        "P5/Traccion",
        "P6/Traccion",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "R-338",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "MACK",
        "MRRS",
        "6x4/10/A",
        6,
        4,
        10,
        "A",
        "TRACTO",
        2,
        8,
        "EQUIPO",
        "P1",
        "P1/Direccional",
        "P2/Direccional",
        "P3/Traccion",
        "P4/Traccion",
        "P5/Traccion",
        "P6/Traccion",
        "P7/Traccion",
        "P8/Traccion",
        "P9/Traccion",
        "P10/Traccion",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "R-444",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "INTERNATIONAL",
        7600,
        "6x4/6/C",
        6,
        4,
        6,
        "C",
        "TRACTO",
        2,
        4,
        "EQUIPO",
        "P1",
        "P1/Direccional",
        "P2/Direccional",
        "P3/Traccion",
        "P4/Traccion",
        "P5/Traccion",
        "P6/Traccion",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "R-467",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "INTERNATIONAL",
        7600,
        "6x4/6/C",
        6,
        4,
        6,
        "C",
        "CAMION FURGON",
        2,
        4,
        "EQUIPO",
        "P1",
        "P1/Direccional",
        "P2/Direccional",
        "P3/Traccion",
        "P4/Traccion",
        "P5/Traccion",
        "P6/Traccion",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "R-587",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "INTERNATIONAL",
        7600,
        "6x4/6/C",
        6,
        4,
        6,
        "C",
        "TRACTO",
        2,
        4,
        "EQUIPO",
        "P1",
        "P1/Direccional",
        "P2/Direccional",
        "P3/Traccion",
        "P4/Traccion",
        "P5/Traccion",
        "P6/Traccion",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "R-75",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "VOLVO",
        "FH12",
        "6x4/10/A",
        6,
        4,
        10,
        "A",
        "TRACTO",
        2,
        8,
        "EQUIPO",
        "P1",
        "P1/Direccional",
        "P2/Direccional",
        "P3/Traccion",
        "P4/Traccion",
        "P5/Traccion",
        "P6/Traccion",
        "P7/Traccion",
        "P8/Traccion",
        "P9/Traccion",
        "P10/Traccion",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      [
        "R-786",
        "INSPEC",
        "MIXTA",
        "CPK",
        "",
        "KENWORTH",
        "T2000",
        "6x4/10/A",
        6,
        4,
        10,
        "A",
        "TRACTO",
        2,
        8,
        "EQUIPO",
        "P1",
        "P1/Direccional",
        "P2/Direccional",
        "P3/Traccion",
        "P4/Traccion",
        "P5/Traccion",
        "P6/Traccion",
        "P7/Traccion",
        "P8/Traccion",
        "P9/Traccion",
        "P10/Traccion",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ]
    ];

    let headersXlsx: any[] = this.columns.map(el => {
      return {
        name: el.name,
        stick: el.stick
      }
    })

    this.excel.downloadExel('vehiculos', headersXlsx, table_xlsx)
  }

}
