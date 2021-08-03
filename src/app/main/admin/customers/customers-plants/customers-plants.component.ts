import { LOCALE_ID, Inject, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterPlantComponent } from 'src/app/components/register-plant/register-plant.component';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers-plants',
  templateUrl: './customers-plants.component.html',
  styleUrls: ['./customers-plants.component.scss']
})
export class CustomersPlantsComponent implements OnInit {

  allData: any = []
  data: any = []
  columns = [
    { name: 'Nombre', slug: 'nombre', stick: true },
    { name: 'Dirección', slug: 'direccion', stick: false },
    { name: 'Cliente', slug: 'razon_social', stick: false },
    { name: 'Fecha', slug: 'date', stick: false, width: 85 },
    { name: 'Acciones', slug: 'options', stick: true, width: 100 },
  ]

  actions = [
    { icon: 'edit', id: 1 },
    { icon: 'delete', id: 2 }
  ]

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomersService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.id) {
      this.getData()
    }
  }

  getData() {
    const formData = new FormData();
    formData.append('cliente_id', this.activatedRoute.snapshot.params.id);

    this.customerService.getListPlants(formData).subscribe(res => {
      console.log(res)
      this.allData = res['data'].map(el => {
        el.date = formatDate(el.created_at, 'dd/MM/yyyy', this.locale)
        return el
      })
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
        id: this.activatedRoute.snapshot.params.id
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
