import { Component, OnInit } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {

  allData: any = []

  data: any = []
  columns = [
    { name: 'ID', slug: 'id', stick: true },
    { name: 'Rol', slug: 'role', stick: true },
    { name: 'Descripción', slug: 'description', stick: false },
    { name: 'Acciones', slug: 'options', stick: true }
  ]

  actions = [
    { icon: 'edit', id: 1 },
    { icon: 'delete', id: 2 }
  ]

  constructor(
    private router: Router,
    private roleService: RolesService
  ) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(res => {
      this.allData = res['data']
    })
  }

  getAction(data) {
    switch (data.type) {
      case 1:
        this.editRegister(data.row)
        break;
      case 2:
        this.optionsDialog(data.row)
        break;
      default:
        break;
    }
  }

  editRegister(res) {
    this.router.navigate(['/main/admin/roles/edit', res.id])
  }

  optionsDialog(res) {
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
        formDelete.append('role_id', res.id);
        this.roleService.deleteRol(formDelete).subscribe(() => {
          Swal.fire({
            title: 'Eliminado',
            icon: 'success',
            heightAuto: false
          })
          this.roleService.getRoles().subscribe(res => {
            this.allData = res['data']
          })
        })

      } else {

      }
    });
  }

}
