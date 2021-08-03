import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-criteria',
  templateUrl: './import-criteria.component.html',
  styleUrls: ['./import-criteria.component.scss']
})
export class ImportCriteriaComponent implements OnInit {

  columns = [
    { name: 'placa', slug: 'placa', stick: true },
    { name: 'codigo', slug: 'codigo', stick: true },
    { name: 'aplicación', slug: 'aplicacion', stick: true },
    { name: 'tipo de costo', slug: 'tipo_de_costo', stick: true },
    { name: 'fecha de fabricacion', slug: 'fecha_de_fabricacion', stick: false },
    { name: 'marca', slug: 'marca', stick: true },
    { name: 'modelo', slug: 'modelo', stick: true },
    { name: 'configuracion del vehiculo', slug: 'configuracion_del_vehiculo', stick: true },
    { name: 'punto de apoyo', slug: 'punto_de_apoyo', stick: true },
    { name: 'punto de traccion', slug: 'punto_de_traccion', stick: true },
    { name: 'numero de neumaticos', slug: 'numero_de_neumaticos', stick: true },
    { name: 'tipo de configuracion', slug: 'tipo_de _configuracion', stick: true },
    { name: 'tipo de vehiculo', slug: 'tipo_de_vehiculo', stick: true },
    { name: 'neumaticos delanteros', slug: 'neumaticos_delanteros', stick: true },
    { name: 'neumaticos posteriores', slug: 'neumaticos_posteriores', stick: true },
    { name: 'descripcion', slug: 'descripcion', stick: false },
    { name: 'posicion inicial', slug: 'posicion_inicial', stick: false }
  ]

  allData = []

  constructor() { }

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

    let info = array.map(el => Object.values(el)).slice(1)
    /*this.allData = info.map(el => {
      let obj: object = {}
      this.columns.forEach((cl, ind) => {
        obj[cl.slug] = el[ind]
      })
      return obj
    })*/

    console.log(info)

  }

  downloadXls(): void {
    let table_xlsx: any[] = [];

    let headersXlsx: string[] = this.columns.map(el => el.name)

    table_xlsx.push(headersXlsx);
    table_xlsx.push([
      "",
      "78000701x2",
      "2020-06-12",
      264.25,
      927.5174999999999,
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
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(table_xlsx);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Neumaticos');

    const name = `neumatico_ejem.xlsx`
    XLSX.writeFile(wb, name);
  }

}
