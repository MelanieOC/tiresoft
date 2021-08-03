import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  allData: any = []
  data: any = []
  columns = [
    { name: 'Nombre completo', slug: 'identificador', stick: true },
    { name: 'Reporte', slug: 'placa', stick: true },
    { name: 'Última actualización', slug: 'codigo', stick: true },
    { name: 'Reporte Generado', slug: 'nomtipo', stick: true },
    { name: 'Estado', slug: 'date', stick: true },
    { name: 'Aprobación', slug: 'km_inspeccion', stick: true }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  editRegister(res) {
    console.log(res)

  }

  optionsDialog(res) {
    console.log(res)
  }
}
