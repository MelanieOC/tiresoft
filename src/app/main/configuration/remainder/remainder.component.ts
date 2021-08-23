import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterRemainderComponent } from './register-remainder/register-remainder.component';
import { DatabaseService } from 'src/app/services/database.service';
import Swal from 'sweetalert2';
import { AplicationService } from 'src/app/services/aplication.service';

@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.scss']
})
export class RemainderComponent implements OnInit {

  allData: any = []

  columns = [
    { name: 'ID', slug: 'id_aplicacion', stick: true },
    { name: 'Aplicación', slug: 'aplicacion', stick: true },
    { name: 'Para Reencauche', slug: 'para_reencacuche', stick: false },
    { name: 'Próximo a Reencauche', slug: 'prox_reencauche', stick: false },
    { name: 'Acciones', slug: 'options', stick: true }
  ]

  actions = [
    { icon: 'edit', id: 1, tooltip: 'editar' },
    { icon: 'delete', id: 2, tooltip: 'eliminar' }
  ]

  constructor(
    private dialog: MatDialog,
    private dbs: DatabaseService,
    private appService: AplicationService
  ) { }


  ngOnInit(): void {
    this.getData()

  }

  getData() {
    let cust = this.dbs.customerSelect.value

    this.appService.getList({ cliente_id: cust.id_cliente }).subscribe(res => {
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

  editRegister(res) {
    const row = res.row
    console.log(row)
  }

  optionsDialog(res) {
    console.log(res)
  }

  openDialog(data) {
    this.dialog.open(RegisterRemainderComponent, {
      data,
      width: '600px',
      disableClose: true,
      autoFocus: false
    }).afterClosed().subscribe(res => {
      if (res) {
        this.getData()
      }
    })
  }

  delete(res) {
    let cust = this.dbs.customerSelect.value
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
        formDelete.append('cliente_id', cust.id_cliente);
        formDelete.append('id_aplicacion', res.id_aplicacion);
        this.appService.delete(formDelete).subscribe(() => {
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
}
