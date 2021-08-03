import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterPlantComponent } from 'src/app/components/register-plant/register-plant.component';
import { CustomersService } from 'src/app/services/customers.service';
import { DatabaseService } from 'src/app/services/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-plants',
  templateUrl: './list-plants.component.html',
  styleUrls: ['./list-plants.component.scss']
})
export class ListPlantsComponent implements OnInit {
  allData: any = [
    { name: 'CHANCAY', address: 'Urb. Lotización chacarilla Mz. C Lote 21 Chancay, Huaral Dpto. Lima.', customer: 'CONCREMAX', date: '2021-05-13' },
    { name: 'HUACHO', address: 'Av. Peru 534 Distrito de Santa Maria, Provincia de Huaura, Departamento Lima', customer: 'CONCREMAX', date: '2021-05-13' },
    { name: 'PARACAS', address: 'Mza. V Parcela Santa Elena de Paracas - Paracas - Pisco.', customer: 'CONCREMAX', date: '2021-05-13' }
  ]
  data: any = []
  columns = [
    { name: 'Nombre', slug: 'nombre', stick: true },
    { name: 'Dirección', slug: 'direccion', stick: false },
    { name: 'Cliente', slug: 'razon_social', stick: false },
    { name: 'Acciones', slug: 'options', stick: true, width: 80 },
  ]

  actions = [
    { icon: 'edit', id: 1 },
    { icon: 'delete', id: 2 }
  ]

  constructor(
    private dialog: MatDialog,
    private dbs: DatabaseService,
    private customerService: CustomersService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    let cust = this.dbs.customerSelect.value
    const formData = new FormData();
    formData.append('cliente_id', cust.id_cliente);

    this.customerService.getListPlants(formData).subscribe(res => {
      console.log(res)
      this.allData = res['data']
    })
  }

  getAction(data) {
    switch (data.type) {
      case 1:
        this.openDialog(data.row)
        break;
      case 2:
        this.delete(data.row)
        break;
      default:
        break;
    }
  }

  delete(res) {
    Swal.fire({
      title: '¿Está seguro que desea borrar el siguiente registro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      heightAuto: false
    }).then((result) => {
      if (result.value) {
        const formDelete = new FormData();
        formDelete.append('planta_id', res.id);
        this.customerService.deletePlant(formDelete).subscribe(() => {
          Swal.fire({
            title: 'Eliminado',
            icon: 'success',
            heightAuto: false
          })
          this.getData()
        })
      }
    });
  }

  openDialog(data) {
    this.dialog.open(RegisterPlantComponent, {
      data: {
        row: data,
        id: this.dbs.customerSelect.value.id_cliente
      },
      width: '500px',
      disableClose: true,
      autoFocus: false
    }).afterClosed().subscribe(res => {
      if (res) {
        this.getData()
      }
    })
  }
}
