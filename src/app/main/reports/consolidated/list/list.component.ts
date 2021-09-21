import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  allData: any = [
    { report: '01/05/2021 - 31/05/2021', status: 'Enviado', date: '21/06/2021' },
    { report: '01/04/2021 - 30/04/2021', status: 'Aprobado', date: '02/05/2021' },
    { report: '01/03/2021 - 31/03/2021', status: 'Rechazado', date: '17/04/2021' },
    { report: '01/01/2021 - 31/03/2021', status: 'Enviado', date: '15/04/2021' }
  ]

  data: any = []
  columns = [
    { name: 'Periodo', slug: 'report', stick: true },
    { name: 'Estado', slug: 'status', stick: true },
    { name: 'Fecha Actualización', slug: 'date', stick: false },
    { name: 'Acciones', slug: 'options', stick: true, width: 120 }
  ]

  actions = [
    { icon: 'visibility', id: 1, tooltip: 'visualizar' },
    { icon: 'download', id: 2, tooltip: 'descargar' },
    { icon: 'question_answer', id: 3, tooltip: 'mensajes' },
    //{ icon: 'delete', id: 4, tooltip: 'borrar' }
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
