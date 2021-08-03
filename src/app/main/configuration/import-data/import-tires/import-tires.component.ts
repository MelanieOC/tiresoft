import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-tires',
  templateUrl: './import-tires.component.html',
  styleUrls: ['./import-tires.component.scss']
})
export class ImportTiresComponent implements OnInit {

  columns = [
    { name: 'serie del cliente', slug: 'serie_del_cliente', stick: false },
    { name: 'numero de serie', slug: 'numero_de_serie', stick: true },
    { name: 'fecha registro', slug: 'fecha_registro', stick: true },
    { name: 'precio dolares', slug: 'precio_dolares', stick: true },
    { name: 'precio soles', slug: 'precio_soles', stick: true },
    { name: 'unidad de medida', slug: 'unidad_de_medida', stick: true },
    { name: 'condicion del neumatico', slug: 'condicion_del_neumatico', stick: true },
    { name: 'cantidad de reencauches', slug: 'cantidad_de_reencauches', stick: false },
    { name: 'presion recomendada', slug: 'presion_recomendada', stick: true },
    { name: 'modelo', slug: 'modelo', stick: true },
    { name: 'marca', slug: 'marca', stick: true },
    { name: 'medida neumatico', slug: 'medida_neumatico', stick: true },
    { name: 'disenio por reencauche', slug: 'disenio_por_reencauche', stick: false },
    { name: 'ruc de la empresa reencauchadora', slug: 'ruc_de_la_empresa_reencauchadora', stick: true },
    { name: 'razon social de la empresa reencauchadora', slug: 'razon_social_de_la_empresa_reencauchadora', stick: false },
    { name: 'km recorridos', slug: 'km_recorridos', stick: false },
    { name: 'profundidad rodado izquierdo', slug: 'profundidad_rodado_izquierdo', stick: true },
    { name: 'profundidad rodado medio', slug: 'profundidad_rodado_medio', stick: true },
    { name: 'profundidad rodado derecho', slug: 'profundidad_rodado_derecho', stick: true },
    { name: 'remanente reencauche', slug: 'remanente_reencauche', stick: false },
    { name: 'remanente original', slug: 'remanente_original', stick: false }
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
    this.allData = info.map(el => {
      let obj: object = {}
      this.columns.forEach((cl, ind) => {
        obj[cl.slug] = el[ind]
      })
      return obj
    })

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
