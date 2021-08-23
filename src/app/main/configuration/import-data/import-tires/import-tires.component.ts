import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { ImportService } from 'src/app/services/import.service';

@Component({
  selector: 'app-import-tires',
  templateUrl: './import-tires.component.html',
  styleUrls: ['./import-tires.component.scss']
})
export class ImportTiresComponent implements OnInit {

  columns = [
    { name: 'serie del cliente', slug: 'serie_del_cliente', type: 'string', stick: false, width: 120, widthE: 20 },
    { name: 'numero de serie', slug: 'numero_de_serie', type: 'string', stick: true, widthE: 20 },
    { name: 'fecha registro', slug: 'fecha_registro', type: 'string', stick: true, width: 120, widthE: 20 },
    { name: 'precio dolares', slug: 'precio_dolares', type: 'number', stick: true, widthE: 20 },
    { name: 'precio soles', slug: 'precio_soles', type: 'number', stick: true, widthE: 20 },
    { name: 'unidad de medida', slug: 'unidad_de_medida', type: 'string', stick: true, widthE: 20 },
    { name: 'condicion del neumatico', slug: 'condicion_del_neumatico', type: 'string', stick: true, widthE: 20 },
    { name: 'cantidad de reencauches', slug: 'cantidad_de_reencauches', type: 'number', stick: false, widthE: 20 },
    { name: 'presion recomendada', slug: 'presion_recomendada', type: 'number', stick: true, widthE: 20 },
    { name: 'modelo', slug: 'modelo', type: 'string', stick: true, widthE: 20 },
    { name: 'marca', slug: 'marca', type: 'string', stick: true, widthE: 20 },
    { name: 'medida neumatico', slug: 'medida_neumatico', type: 'string', stick: true, widthE: 20 },
    { name: 'disenio por reencauche', slug: 'disenio_por_reencauche', type: 'string', stick: false, widthE: 20 },
    { name: 'ruc de la empresa reencauchadora', slug: 'ruc_de_la_empresa_reencauchadora', type: 'string', stick: false, width: 120, widthE: 20 },
    { name: 'razon social de la empresa reencauchadora', slug: 'razon_social_de_la_empresa_reencauchadora', type: 'string', stick: false, width: 200, widthE: 28 },
    { name: 'km recorridos', slug: 'km_recorridos', type: 'number', stick: false, widthE: 20 },
    { name: 'profundidad rodado izquierdo', slug: 'profundidad_rodado_izquierdo', type: 'number', stick: false, widthE: 20 },
    { name: 'profundidad rodado medio', slug: 'profundidad_rodado_medio', type: 'number', stick: false, widthE: 20 },
    { name: 'profundidad rodado derecho', slug: 'profundidad_rodado_derecho', type: 'number', stick: false, widthE: 20 },
    { name: 'remanente reencauche', slug: 'remanente_reencauche', type: 'number', stick: false, widthE: 20 },
    { name: 'remanente original', slug: 'remanente_original', type: 'number', stick: false, widthE: 20 }
  ]

  allData = []
  series = []
  errorList = []
  observs: number = 0
  reboot = false
  buttonSubmit:boolean = false

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
      if(this.reboot){
        this.reboot = false
      }
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
    let info = array.map(el => Object.values(el))
    const headers = info[0].map(el => el.replace(/ /g, ""))
      .filter(hd => this.columns.find(cl => cl.name.replace(/ /g, "") == hd))

    if (headers.length == this.columns.length) {
      this.allData = info.slice(1).map(el => {
        let obj: object = {}
        this.columns.forEach((cl, ind) => {
          if (cl.slug == 'numero_de_serie') {
            this.series.push(el[ind])
          }
          if (cl.type == 'number' && cl.stick) {
            if (el[ind]) {
              const num = typeof el[ind] == 'number' ? el[ind] : Number(el[ind])
              obj[cl.slug] = Math.round(num * 100) / 100
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
          if (cl.stick && !dt[cl.slug]) {
            errors.push('Dato faltante ' + cl.name)
          }
        })
        const repite = this.series.filter(sr => sr == dt['numero_de_serie'])
        if (repite.length > 1) {
          errors.push('número de serie repetido')
        }
        if (dt['disenio_por_reencauche'] == dt['modelo']) {
          errors.push('modelo y disenio por reencauche son iguales')
        }

        return {
          error: errors.length > 0,
          serie: dt['numero_de_serie'],
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
      excel_neumaticos: this.allData
    }
    this.importService.importTires(send).subscribe(res => {
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
      excel_neumaticos: this.allData
    }
    this.importService.verifiedTires(send).subscribe(res => {
      //console.log(res)
      if (res['total_series_repetidas'] > 0) {
        this.errorList = this.errorList.map(er => {
          const find = res['series_repetidas'].filter(sr => sr.series == er.serie)
          if (find.length) {
            er.error = true
            er.list.push('El número de serie existe en la base de datos')
          }
          return er
        })
        this.observs = this.errorList.filter(vr => vr.error).length
      }
    })
  }

  restart(){
    this.errorList = []
    this.allData = []
    this.reboot = true
  }

  downloadXls(): void {
    let table_xlsx: any[] = [];

    let headersXlsx: any[] = this.columns.map(el => {
      return {
        name: el.name,
        width: el.widthE,
        stick: el.stick
      }
    })

    table_xlsx.push([
      "",
      "78000701x2",
      "2020-06-12",
      264.25,
      927.52,
      "K",
      "Nuevo",
      "",
      110,
      "JY523",
      "JINYU",
      "12R22.5",
      "",
      20100373018,
      "",
      "",
      11,
      10,
      11,
      "",
      16
    ])
    table_xlsx.push([
      "",
      "78000802x2",
      "2020-06-13",
      180,
      631.8,
      "K",
      "Reencauchado",
      1,
      110,
      "GT878",
      "GT RADIAL",
      "425/65R22.5",
      "TZY3",
      20100373018,
      "REENCAUCHADORA EL SOL S.A.C.",
      0,
      12,
      10,
      12,
      12,
      ""
    ])

    this.excel.downloadExel('neumatico', headersXlsx, table_xlsx)
  }

}
