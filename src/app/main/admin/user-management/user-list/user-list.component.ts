import { LOCALE_ID, Inject, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  allData: any = []

  data: any = []
  columns = [
    { name: 'ID', slug: 'id', stick: true },
    { name: 'Rol', slug: 'role', stick: false },
    { name: 'Nombre', slug: 'usuario', stick: true },
    { name: 'Email', slug: 'email', stick: false },
    { name: 'Firma', slug: 'firma_status', stick: false },
    { name: 'Fecha', slug: 'date', stick: false },
    { name: 'Acciones', slug: 'options', stick: true, width: 120 }
  ]

  actions = [
    { icon: 'edit', id: 1, tooltip: 'editar' },
    { icon: 'delete', id: 2, tooltip: 'eliminar' }
  ]

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getList().subscribe(res => {
      this.allData = res['data'].map(el => {
        el.id = el.user_id
        el.date = formatDate(el.fecha, 'dd/MM/yyyy', this.locale)
        return el
      })
    })
  }

  getAction(data) {
    switch (data.type) {
      case 1:
        this.router.navigate(['/main/admin/usuarios/editar', data.row.id])
        break;
      case 2:
        this.optionsDialog(data.row)
        break;
      default:
        break;
    }
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
        formDelete.append('user_id', res.id);
        this.userService.deleteUser(formDelete).subscribe(() => {
          Swal.fire({
            title: 'Eliminado',
            icon: 'success',
            heightAuto: false
          })
          /*this.roleService.getRoles().subscribe(res => {
            this.allData = res['data']
          })*/
        })
      }
    });
  }

}
