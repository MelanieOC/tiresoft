import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  allData: any = []

  data: any = []
  columns = [
    { name: 'Reporte', slug: 'report', stick: true },
    { name: 'Estado', slug: 'status', stick: true },
    { name: 'Fecha Actualización', slug: 'usuario', stick: false },
    { name: 'Acciones', slug: 'options', stick: true, width: 120 }
  ]

  actions = [
    { icon: 'visibility', id: 1, tooltip: 'visualizar' },
    { icon: 'download', id: 2, tooltip: 'descargar' },
    { icon: 'download', id: 2, tooltip: 'descargar' },
    { icon: 'download', id: 2, tooltip: 'descargar' }
  ]


  constructor() { }

  ngOnInit(): void {
  }

  getAction(data) {
    switch (data.type) {
      case 1:
        //this.router.navigate(['/main/admin/usuarios/editar', data.row.id])
        break;
      case 2:
        //this.optionsDialog(data.row)
        break;
      default:
        break;
    }
  }

}
