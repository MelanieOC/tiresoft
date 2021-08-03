import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  allData: any = []

  data: any = []
  columns = [
    { name: 'ID', slug: 'id', stick: true },
    { name: 'Razón social', slug: 'razon_social', stick: true, width: 100 },
    { name: 'Ruc', slug: 'ruc', stick: true, width: 100 },
    { name: 'Dirección', slug: 'direccion', stick: false, width: 100 },
    //{ name: 'Logotipo', slug: 'firm', stick: false },
    { name: 'Acciones', slug: 'options', stick: true, width: 130 }
  ]

  actions = [
    { icon: 'edit', id: 1 },
    { icon: 'people_alt', id: 2 },
    { icon: 'precision_manufacturing', id: 3 }
  ]

  constructor(
    private router: Router,
    private customerService: CustomersService
  ) { }

  ngOnInit(): void {
    this.customerService.getList().subscribe(res => {
      this.allData = res['data']
    })
  }

  getAction(data) {
    switch (data.type) {
      case 1:
        this.router.navigate(['/main/admin/clientes/edit', data.row.id])
        break;
      case 2:
        this.router.navigate(['/main/admin/clientes/contacts', data.row.id])
        break;
      case 3:
        this.router.navigate(['/main/admin/clientes/plants', data.row.id])
        break;
      default:
        break;
    }
  }


}
