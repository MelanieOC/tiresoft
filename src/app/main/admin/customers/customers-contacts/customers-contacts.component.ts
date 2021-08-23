import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-contacts',
  templateUrl: './customers-contacts.component.html',
  styleUrls: ['./customers-contacts.component.scss']
})
export class CustomersContactsComponent implements OnInit {

  allData: any = []

  data: any = []
  columns = [
    { name: 'ID', slug: 'id', stick: true },
    { name: 'Nombre', slug: 'razon_social', stick: true, width: 100 },
    { name: 'Correo', slug: 'ruc', stick: true, width: 100 },
    { name: 'Teléfono', slug: 'direccion', stick: false, width: 100 },
    { name: 'Cargo', slug: 'firm', stick: false },
    { name: 'Incluido en Reporte', slug: 'other', stick: true, width: 130 },
    { name: 'Acciones', slug: 'options', stick: true, width: 100 }
  ]

  actions = [
    { icon: 'edit', id: 1, tooltip: 'editar' },
    { icon: 'delete', id: 2, tooltip: 'eliminar' }
  ]


  constructor() { }

  ngOnInit(): void {
  }

  getAction(data) {
    switch (data.type) {
      case 1:
        console.log(data.row.id)
        break;
      case 2:
        console.log(data.row.id)
        break;
      default:
        break;
    }
  }

}
